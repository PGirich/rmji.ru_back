import { forwardRef, Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './users.model'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/Userroles.model'
import { RolesModule } from 'src/roles/roles.module'
import { AuthModule } from 'src/auth/auth.module'
import { PostsModule } from 'src/posts/posts.module'
import { Post } from 'src/posts/posts.model'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    RolesModule,
    forwardRef(()=>AuthModule),
    PostsModule
  ],
  exports: [
    UsersService,
  ],
})
export class UsersModule {}
