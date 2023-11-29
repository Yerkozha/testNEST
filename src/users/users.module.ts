import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users.entity';
import { Role } from 'src/roles/roles.entity';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { UserConsumer } from './users.consumer';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserConsumer],

  imports: [TypeOrmModule.forFeature([User, Role]), RolesModule, forwardRef(() => AuthModule),
  BullModule.registerQueue({
    name: 'user',
  }),

  ],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule {}
