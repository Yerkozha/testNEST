import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/roles.dto';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService){}

    @Post()
    create(@Body() roleCredentials: RoleDto) {

        return this.roleService.createRole(roleCredentials)
    }

    @Get('/:value')
    getRoleByName(@Param('value') param: string ) {

        return this.roleService.getRoleByName(param)
    }

}
