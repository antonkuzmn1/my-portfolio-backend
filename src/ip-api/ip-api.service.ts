import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

export interface IpApiResponse {
  ipVersion: number, // 4
  ipAddress: string, // "185.255.178.34"
  latitude: number, // 59.436958
  longitude: number, // 24.753531
  countryName: string, // "Estonia"
  countryCode: string, // "EE"
  timeZone: string, // "+03:00"
  zipCode: string, // "10153"
  cityName: string, // "Tallinn"
  regionName: string, // "Harjumaa"
  isProxy: boolean, // false
  continent: string, // "Europe"
  continentCode: string, // "EU"
  currency: { code: string, name: string }, // { "code": "EUR", "name": "Euro" }
  language: string, // "Estonian"
  timeZones: string[], // ["Europe/Tallinn"]
  tlds: string[], // [".ee"]
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
