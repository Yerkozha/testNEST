import { Injectable } from '@nestjs/common';
import { RoleDto } from './dto/roles.dto';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
    constructor( @InjectRepository(Role) private roleRepository: Repository<Role> ) {}

    async createRole( roleCredentials: RoleDto ) {

        const role = await this.roleRepository.save(roleCredentials);

        return role
    }

    async getRoleByName( value: string ) {

        return await this.roleRepository.findOne({where: {value}}) 
    }

}
