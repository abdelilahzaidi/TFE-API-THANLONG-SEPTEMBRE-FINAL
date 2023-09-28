import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLieuDto } from 'src/commun/dto/lieu/lieu-create.dto';
import { CourEntity } from 'src/commun/entities/cour/cour';
import { Repository } from 'typeorm';
import { LieuService } from '../lieu/lieu.service';
import { CreateCourDTO } from 'src/commun/dto/cour/cour-create.dto';

@Injectable()
export class CourService {
    constructor(
        @InjectRepository(CourEntity)
        private courRepository: Repository<CourEntity>,
        private lieuService : LieuService
      ) {}
    
      async all(): Promise<CourEntity[]> {
        return await this.courRepository.find();
      }

      async createLevel(dto: CreateCourDTO): Promise<CourEntity> {
        try {
            const lieu = await this.lieuService.findLieuById(dto.lieuId); // Récupérez le programme associé

            const cour = new CourEntity();
            cour.objectifDuCour=dto.objectifDuCour
            cour.lieu=lieu      
     

            const savedCour = await this.courRepository.save(cour);

            console.log('in service', savedCour);
            return savedCour;
        } catch (error) {
          throw new InternalServerErrorException(
            error,
            "Une erreur est survenue lors de la creation du niveau de l'utilisateur.",
          );
        }
    }    
      async findLevelById(id: number): Promise<CourEntity | undefined> {
        return this.courRepository.findOne({ where: { id } });
      }
}
