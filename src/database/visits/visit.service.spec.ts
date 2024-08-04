import { INestApplication } from '@nestjs/common';
import { VisitData, VisitService } from './visit.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOptions } from '../database-options';
import { Visit, VisitActions } from './visit.entity';
import { IpApiService } from '../../ip-api/ip-api.service';
import { TelegramService } from '../../telegram/telegram.service';

describe('Visit Service', () => {
  let app: INestApplication;
  let service: VisitService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRootAsync(databaseOptions),
        TypeOrmModule.forFeature([Visit]),
      ],
      providers: [
        VisitService,
        IpApiService,
        TelegramService
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    service = moduleFixture.get<VisitService>(VisitService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new visit', async () => {
    const headers = {
      "connection": "upgrade",
      "host": "api.antonkuzm.in",
      "x-real-ip": "185.255.178.34",
      "x-forwarded-for": "185.255.178.34",
      "x-forwarded-proto": "https",
      "content-length": "18",
      "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
      "accept": "application/json, text/plain, */*",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-purpose": "prefetch;prerender",
      "sec-ch-ua-mobile": "?0",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      "content-type": "application/json",
      "origin": "https://antonkuzm.in",
      "purpose": "prefetch",
      "sec-fetch-site": "same-site",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      "referer": "https://antonkuzm.in/",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9,ru;q=0.8"
    }
    const answerAction: string = 'Turn';
    const data: Visit = await service.createVisit(headers, VisitActions.Turn);
    expect(data.action).toEqual(answerAction);
  })

  it('should get a data by headers', async () => {
    const headers = {
      "connection": "upgrade",
      "host": "api.antonkuzm.in",
      "x-real-ip": "185.255.178.34",
      "x-forwarded-for": "185.255.178.34",
      "x-forwarded-proto": "https",
      "content-length": "18",
      "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
      "accept": "application/json, text/plain, */*",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-purpose": "prefetch;prerender",
      "sec-ch-ua-mobile": "?0",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      "content-type": "application/json",
      "origin": "https://antonkuzm.in",
      "purpose": "prefetch",
      "sec-fetch-site": "same-site",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      "referer": "https://antonkuzm.in/",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9,ru;q=0.8"
    }
    const answer: VisitData = {
      host: 'api.antonkuzm.in',
      'x-real-ip': '185.255.178.34',
      'sec-ch-ua-platform': '"macOS"',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
      origin: 'https://antonkuzm.in',
      referer: 'https://antonkuzm.in/',
      'accept-language': 'en-US,en;q=0.9,ru;q=0.8',
      country: 'Estonia',
      region: 'Harjumaa',
      city: 'Tallinn'
    };
    const data: VisitData = await service.getVisitDataByHeaders(headers);
    expect(data).toEqual(answer)
  })
});
