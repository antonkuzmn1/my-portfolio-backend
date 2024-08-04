import { INestApplication } from '@nestjs/common';
import { IpApiResponse, IpApiService } from './ip-api.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';

describe('IP API Service', () => {
  let app: INestApplication;
  let service: IpApiService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [IpApiService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    service = moduleFixture.get<IpApiService>(IpApiService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  it('should get a data', async () => {
    const ip = '8.8.8.8';
    const answer: IpApiResponse = {
      ipVersion: 4,
      ipAddress: '8.8.8.8',
      latitude: 37.386051,
      longitude: -122.083847,
      countryName: 'United States of America',
      countryCode: 'US',
      timeZone: '-07:00',
      zipCode: '94035',
      cityName: 'Mountain View',
      regionName: 'California',
      isProxy: false,
      continent: 'Americas',
      continentCode: 'AM',
      currency: { code: 'USD', name: 'US Dollar' },
      language: 'English',
      timeZones: [
        'America/Adak',
        'America/Anchorage',
        'America/Boise',
        'America/Chicago',
        'America/Denver',
        'America/Detroit',
        'America/Indiana/Indianapolis',
        'America/Indiana/Knox',
        'America/Indiana/Marengo',
        'America/Indiana/Petersburg',
        'America/Indiana/Tell_City',
        'America/Indiana/Vevay',
        'America/Indiana/Vincennes',
        'America/Indiana/Winamac',
        'America/Juneau',
        'America/Kentucky/Louisville',
        'America/Kentucky/Monticello',
        'America/Los_Angeles',
        'America/Menominee',
        'America/Metlakatla',
        'America/New_York',
        'America/Nome',
        'America/North_Dakota/Beulah',
        'America/North_Dakota/Center',
        'America/North_Dakota/New_Salem',
        'America/Phoenix',
        'America/Sitka',
        'America/Yakutat',
        'Pacific/Honolulu'
      ],
      tlds: [ '.us' ]
    }
    const data = await service.get(ip);
    expect(data).toEqual(answer);
  });
})
