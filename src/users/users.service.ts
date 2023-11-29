import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/users.dto';
import { RolesService } from 'src/roles/roles.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class UsersService implements OnModuleInit {

    constructor( @InjectRepository(User) private userRepository: Repository<User>, 
                @InjectQueue('user') private audioQueue: Queue,
                private roleService: RolesService,
                private eventEmitter: EventEmitter2,
    ) {}

    onModuleInit(){
        
    }

    async createUser( userCredentials: UserDto ) {
        console.log(userCredentials, 'dd')
        const user = await this.userRepository.create(userCredentials);

        user.status = true;

        const role = await this.roleService.getRoleByName("admin") // $set // save create
       
        if( role ) {
            user.roles = [role]
        }

        await this.audioQueue.add(
            {
              user,
            },
            { delay: 10000 },
          );
        
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.find({
            relations: ['roles']
        })
        return users
    }

    async getUserByEmail(email) {
        
        return await this.userRepository.find({
            where: {email},
            relations: ['roles']
        })

    }

    async getUserById( userId ) {
        const foundUser =  await this.userRepository.find({
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                password: false
            },
            where: {id: userId},
            
        });
        if(foundUser.length) {
            return foundUser
        }

        throw new HttpException('ERR_USER_NOT_FOUND', HttpStatus.BAD_REQUEST)
        
    }
}
