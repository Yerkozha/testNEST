import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcryptjs'; 

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService  
            ){}


    
    async login( loginCredentials: UserDto ) {
       const user = await this.validateUser(loginCredentials);

       return this.token(user)
    }

   
    async register( registerCred: UserDto ) {
        
        const record = await this.usersService.getUserByEmail(registerCred.email);
       
        if( record.length ) {
            throw new HttpException('ERR_USER_EMAIL_EXISTS', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(registerCred.password, 5 );
       
        const createdUser = await this.usersService.createUser({
            ...registerCred,
            password: hashPassword
        });

        return this.token(createdUser)

    }

    async token( user ) {
        return {
            token: this.jwtService.sign( {
                email: user.email,
                id: user.id,
                name: user.name,
                roles: user.roles
            })
        }
    }

    protected async validateUser( userCred: UserDto ) {

        const user = (await this.usersService.getUserByEmail(userCred.email)).shift();

        console.log(user.password, '')

        const isValidPassword = await bcrypt.compare(userCred.password, user?.password)

        if( user && isValidPassword ) {
            return user
        } 

        throw new UnauthorizedException({message: 'Invalid credentials'})

    }


}
