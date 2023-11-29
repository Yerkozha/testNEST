import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class UserDto {

    @ApiProperty({example: 'test', description: "User's name"})
    @IsString({message: 'Must be string'})
    readonly name: string;

    @ApiProperty({example: 'test@gmail.com', description: "User's email"})
    @IsString({message: 'Must be string'})
    @IsEmail({},{ message: 'Unvalid email' })
    readonly email: string;

    @ApiProperty({example: 'Qwerty', description: "User's password"})
    @IsString({message: 'Must be string'})
    @Length(5, 16 ,{message: 'Length should at least 5 characters and max is 16'})
    readonly password: string;

}