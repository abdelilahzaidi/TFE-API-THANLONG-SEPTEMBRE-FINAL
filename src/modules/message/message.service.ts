import { UserCreateDTO } from 'src/commun/dto/user/user-create.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from 'src/commun/dto/message/create-message.dto';
import { MessageEntity } from 'src/commun/entities/message/message';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/commun/entities/user/user';


@Injectable()
export class MessageService {

    constructor(
      @InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>,
      @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
      ) {}

      // async createMessage(createMessageDto: CreateMessageDto): Promise<MessageEntity> {
      //   const { titre, contenu, receivers, senderId } = createMessageDto;
    
      //   const sender = await this.userRepository.findOne({ where: { id: senderId } });
      //   if (!sender) {
      //     throw new NotFoundException(`User with id ${senderId} not found`);
      //   }
    
      //   // Création du message
      //   const message = this.messageRepository.create({
      //     titre,
      //     contenu,
      //     sender,
      //     receivers: [], // Initialisez la propriété receivers comme un tableau vide
      //   });
    
      //   // Insertion du message dans la table message
      //   const savedMessage = await this.messageRepository.save(message);
    
      //   // Insertion des relations ManyToMany dans la table message_user
      //   for (const receiverId of receivers) {
      //     const receiver = await this.userRepository.findOne({ where: { id: receiverId } });
      //     if (!receiver) {
      //       // Si un utilisateur destinataire n'existe pas, vous pouvez gérer cela comme vous le souhaitez
      //       // Par exemple, lever une exception ou ignorer cet utilisateur
      //       console.log(`User with id ${receiverId} not found. Skipping.`);
      //       continue;
      //     }
    
      //     // Assurez-vous que la propriété receivers est initialisée comme un tableau
      //     savedMessage.receivers = savedMessage.receivers || [];
      //     savedMessage.receivers.push(receiver);
      //   }
    
      //   // Enregistrez le message mis à jour avec les relations ManyToMany
      //   return await this.messageRepository.save(savedMessage);
      // }
      async createMessage(createMessageDto: CreateMessageDto): Promise<MessageEntity> {
    const { titre, contenu, receivers, senderId } = createMessageDto;

    // Recherchez l'expéditeur dans la base de données
    const sender = await this.userRepository.findOne({where:{id:senderId}});

    if (!sender) {
      throw new NotFoundException(`User with id ${senderId} not found`);
    }

    // Créez le message en utilisant les données fournies
    const message = this.messageRepository.create({
      titre,
      contenu,
      receivers: receivers.map(receiverId => ({ id: receiverId })),
      sender: sender,
    });

    // Enregistrez le message dans la base de données
    return await this.messageRepository.save(message);
  }

    
    
      async getMessages(): Promise<MessageEntity[]> {
        return await this.messageRepository.find();
      }
    
      async getMessageById(id: number): Promise<MessageEntity> {
        const message = await this.messageRepository.findOne({where: { id }});
        console.log('message',message)
        if (!message) {
          throw new NotFoundException(`Message with id ${id} not found`);
        }
        return message;
      }

      // async getMessageByTitle(title: string): Promise<any> {
      //   const message = await this.messageRepository.findOne({ where: { title } });
      //   console.log('message',message)
      //   if (!message) {
      //     throw new NotFoundException(`Message with title ${title} not found`);
      //   }
      //   return message;
      // }



 
    
      async deleteMessage(id: number): Promise<void> {
        const message = await this.messageRepository.findOne({where: { id }});
        if (!message) {
          throw new NotFoundException(`Message with id ${id} not found`);
        }
        await this.messageRepository.remove(message);
      }
}
