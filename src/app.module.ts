import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitService } from './database/visits/visit.service';
import { VisitController } from './database/visits/visit.controller';
import { ConfigModule } from '@nestjs/config';
import { TelegramService } from './telegram/telegram.service';
import { IpApiService } from './ip-api/ip-api.service';
import { databaseOptions } from './database/database-options';
import { Visit } from './database/visits/visit.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(databaseOptions),
    TypeOrmModule.forFeature([Visit]),
  ],
  controllers: [VisitController],
  providers: [VisitService, TelegramService, IpApiService],
})
export class AppModule {
}
