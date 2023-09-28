import { IsNotEmpty } from "class-validator";

export class CreateHoraireDto {
    @IsNotEmpty()
    heureDebut: Date;   
    
    @IsNotEmpty()
    heureFin: Date; 

    @IsNotEmpty()
    jour: Date; 
    
}