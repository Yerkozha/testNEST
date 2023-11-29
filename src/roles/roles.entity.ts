import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Role {
    
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Admin', description: "Name of role"})
  @Column({
    length: 100
  })
  value: string;

  @ApiProperty({example: 'Admin rights', description: "Description of role"})
  @Column('text')
  description: string;

  @ManyToMany(type => User, (user) => user.roles, {
    cascade: true
  })
  @JoinTable()
  users: User[]
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


