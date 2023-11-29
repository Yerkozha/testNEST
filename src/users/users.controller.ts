import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard, Roles } from 'src/auth/role.guard';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { CustomResponse, GetCustomResponse } from './custom-response.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor( private userService: UsersService ) {}

    @ApiOperation({summary: 'Create User'})
    @ApiResponse({status: 201, type: User})
    @Post()
    createUser( @Body() userCredentials: UserDto ) {
        
        return this.userService.createUser(userCredentials)
    }

    @ApiOperation({summary: 'Get All users'})
    @ApiResponse({status: 200, type: [User]})
    //@UseGuards(AuthGuard)
    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get()
    getUsers(){
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'Get user by id'})
    @ApiResponse({status: 200, type: [User]})
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1800)   // 30min
    @Get('/:id')
    @CustomResponse('SUCCESS', 200)
    async getUserById( @Param('id') id: number, @GetCustomResponse() customResponse: { message: string; statusCode: number } ){

        const user = await this.userService.getUserById(id);
        
        return {
            data: user,
            message: customResponse.message, 
            status: customResponse.statusCode
        }
    }

}
