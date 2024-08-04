import { ConfigModule, ConfigService } from '@nestjs/config';
import { Visit } from './visits/visit.entity';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const databaseOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [Visit],
    synchronize: true,
  }),
  inject: [ConfigService],
}
