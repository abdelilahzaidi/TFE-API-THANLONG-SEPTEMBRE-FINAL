import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";



@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '14101983',
        database:'thdb',
        entities: [],
        autoLoadEntities: true,
        synchronize:false,
      }),
    ],
  })
  export class BdModule {}