import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { User } from 'src/users/users.entity';

@Module({
  controllers: [RolesController],
  providers: [RolesService],

  imports:[TypeOrmModule.forFeature([Role, User])],

  exports:[TypeOrmModule, RolesService]
})
export class RolesModule {}
