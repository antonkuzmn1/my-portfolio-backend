import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitRepository } from './visit.repository';
import { Visit, VisitActions } from './visit.entity';
import { IpApiResponse, IpApiService } from '../../ip-api/ip-api.service';
import { TelegramService } from '../../telegram/telegram.service';

export interface VisitData {
  host: string, // "api.antonkuzm.in"
  'x-real-ip': string, // "185.255.178.34"
  'sec-ch-ua-platform': string, // "\"macOS\""
  'user-agent': string, // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
  origin: string, // 'https://antonkuzm.in'
  referer: string, // 'https://antonkuzm.in/'
  'accept-language': string, // 'en-US,en;q=0.9,ru;q=0.8'
  country: string, // 'Estonia'
  region: string, // 'Harjumaa'
  city: string, // 'Tallinn'
}

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private visitRepository: VisitRepository,
    private ipApiService: IpApiService,
    private telegramService: TelegramService,
  ) {
  }

  async findAll(): Promise<Visit[]> {
    // return this.visitRepository.find();
    return [];
  }

  async createVisit(headers: any, action: VisitActions, key: string): Promise<Visit> {
    const ipAddress: string | undefined = this.tryGetIp(headers);

    const newVisit: Visit = await this.visitRepository.save({ ipAddress, action });
    const visitData: VisitData = ipAddress ? await this.getVisitDataByHeaders(headers) : undefined;
    const selectedJson = ipAddress ? visitData : headers;
    const json: string = JSON.stringify(selectedJson, null, 2);
    const alert: string = ipAddress
      ? `Country: ${visitData.country}\nRegion: ${visitData.region}\nCity: ${visitData.city}`
      : '❗Undefined IP address❗';
    const telegramMessage: string = `#${newVisit.id}\n${alert}\nKey: ${key}\n\`\`\`json\n${json}\`\`\``;

    await this.telegramService.sendMessage(telegramMessage);

    return newVisit;
  }

  async getVisitDataByHeaders(headers: any): Promise<VisitData> {
    const ip: string | undefined = this.tryGetIp(headers);
    if (!ip) return;

    const ipApiResponse: IpApiResponse = await this.ipApiService.get(ip);

    return {
      host: headers.host ? headers.host : undefined,
      'x-real-ip': ip,
      'sec-ch-ua-platform': headers['sec-ch-ua-platform'] ? headers['sec-ch-ua-platform'] : undefined,
      'user-agent': headers['user-agent'] ? headers['user-agent'] : undefined,
      origin: headers.origin ? headers.origin : undefined,
      referer: headers.referer ? headers.referer : undefined,
      'accept-language': headers['accept-language'] ? headers['accept-language'] : undefined,
      country: ipApiResponse.countryName,
      region: ipApiResponse.regionName,
      city: ipApiResponse.cityName,
    };
  };

  tryGetIp = (headers: any): string | undefined => {
    try {
      return headers['x-real-ip'];
    } catch (error) {
      return undefined;
    }
  };
}
