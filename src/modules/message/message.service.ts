import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from 'src/commun/dto/message/create-message.dto';
import { MessageEntity } from 'src/commun/entities/message/message';
import { Repository } from 'typeorm';


@Injectable()
export class MessageService {

    constructor(@InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>) {}

    async createMessage(createMessageDto: CreateMessageDto): Promise<MessageEntity> {
        const { titre, contenu, receivers } = createMessageDto;
    
        const message = this.messageRepository.create({
          titre,
          contenu,
          receivers: receivers.map(receiverId => ({ id: receiverId })),
        });
    
        return await this.messageRepository.save(message);
      }
    
      async getMessages(): Promise<MessageEntity[]> {
        return await this.messageRepository.find();
      }
    
      async getMessageById(id: number): Promise<MessageEntity> {
        const message = await this.messageRepository.findOne({where: { id }});
        if (!message) {
          throw new NotFoundException(`Message with id ${id} not found`);
        }
        return message;
      }
    
      async deleteMessage(id: number): Promise<void> {
        const message = await this.messageRepository.findOne({where: { id }});
        if (!message) {
          throw new NotFoundException(`Message with id ${id} not found`);
        }
        await this.messageRepository.remove(message);
      }
}
