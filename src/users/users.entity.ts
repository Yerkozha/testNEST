import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/roles.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class User {
    
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Test', description: "User's name"})
  @Column()
  name: string;

  @ApiProperty({example: 'test@gmail.com', description: "User's email"})
  @Column()
  email: string;

  @ApiProperty({example: 'Qwerty', description: "User's password"})
  @Column()
  password: string;
  
  @ApiProperty({example: 'Status false by default', description: "Status of user"})
  @Column({
    type: 'boolean',
    default: false
  })
  status: boolean;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[]

}


// @Entity()
// export class Photo {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string;

//     @Column()
//     userId: number
// }


