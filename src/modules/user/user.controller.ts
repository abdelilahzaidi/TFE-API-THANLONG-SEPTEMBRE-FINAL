import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';1
import { UserEntity } from 'src/commun/entities/user/user';
import { UserCreateDTO } from 'src/commun/dto/user/user-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/commun/entities/message/message';
import { ArrayContains, Repository } from 'typeorm';



@Controller('user')
export class UserController {
    constructor(
        private readonly userService : UserService,
        @InjectRepository(MessageEntity) private readonly messageRepository: Repository<MessageEntity>
    ){}
    @Get()
    async all():Promise<UserEntity[]>{
        return await this.userService.all()
    }
    @Post()
    async createUser(@Body() dto : UserCreateDTO):Promise<UserEntity>{        
        console.log('DTO in controler ',dto)
       return  await this.userService.createUser(dto);
    }
    @Get(':id')
    async getById(@Param('id') id: number){
        return this.userService.findOneById(id)
    }
    @Get(":id/message")
    async getUserMessageByid(@Param('id') id: number) {
        const user: UserEntity = await this.userService.findOneById(id)

        console.log(user)
        const messages = await user.receivedMessages;
        console.log(messages)
        return messages
    }
    @Delete(':id')   
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
    @Put(':id')    
    async update(
        @Param('id') id: number,
        @Body() body
    ) {
        const { ...data} = body;
        
        await this.userService.update(id, {
            ...data,
           
        });

        return this.userService.findOneById(id);
    }
}
