// create-message.dto.ts
import { IsString, IsArray } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  titre: string;

  @IsString()
  contenu: string;

  @IsArray()
  receivers: number[]; 
}
