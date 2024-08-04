import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

export interface IpApiResponse {
  ipVersion: number,
  ipAddress: string,
  latitude: number,
  longitude: number,
  countryName: string,
  countryCode: string,
  timeZone: string,
  zipCode: string,
  cityName: string,
  regionName: string,
  isProxy: boolean,
  continent: string,
  continentCode: string,
  currency: { code: string, name: string },
  language: string,
  timeZones: string[],
  tlds: string[]
}

@Injectable()
export class IpApiService {
  private readonly url: string = 'https://freeipapi.com/api/json/';

  async get(ipAddress: string): Promise<IpApiResponse> {
    const url = this.url + ipAddress;
    const response = await fetch(url, {method: 'GET'});
    return await response.json() as IpApiResponse;
  }
}
