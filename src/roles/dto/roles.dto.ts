import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {
    @ApiProperty({example: 'admin'})
    readonly value: string;
    @ApiProperty({example: 'Admin rights'})
    readonly description: string;

}