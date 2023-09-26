import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/commun/entities/user/user';
import { LevelModule } from '../level/level.module';
import { MessageEntity } from 'src/commun/entities/message/message';


@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity, MessageEntity]),   
    forwardRef(() => LevelModule),  
  ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
