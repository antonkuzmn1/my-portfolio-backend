import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { TelegramService } from './telegram.service';

describe('Telegram Service', () => {
  let app: INestApplication;
  let service: TelegramService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TelegramService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    service = moduleFixture.get<TelegramService>(TelegramService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a message', async () => {
    const message = 'Test message';
    const response = await service.sendMessage(message);
    expect(response).toBeUndefined();
  });
});
