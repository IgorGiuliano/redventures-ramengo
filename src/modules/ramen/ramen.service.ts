import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RamenService {
  private readonly apiKey = process.env.API_KEY;
  private readonly apiUrl = process.env.API_URL;

  constructor(private readonly httpService: HttpService) {}

  async getBroths() {
    const response = await this.httpService
      .get(`${this.apiUrl}/broths`, {
        headers: { 'x-api-key': this.apiKey },
      })
      .toPromise();
    return response.data;
  }

  async getProteins() {
    const response = await this.httpService
      .get(`${this.apiUrl}/proteins`, {
        headers: { 'x-api-key': this.apiKey },
      })
      .toPromise();
    return response.data;
  }
}
