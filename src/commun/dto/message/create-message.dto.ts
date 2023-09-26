// create-message.dto.ts
import { IsString, IsArray, IsInt } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  titre: string;

  @IsString()
  contenu: string;

  @IsArray()
  receivers: number[]; 

  @IsInt() // Ajoutez cette validation pour senderId
  senderId: number;
}
