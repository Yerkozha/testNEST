import { Injectable } from '@nestjs/common';
import axiosProxy from 'axios-proxy-fix';

@Injectable()
export class HttpService {
  private axiosInstance = axiosProxy.create({
    proxy: {
      host: process.env.PROXY_HOST || 'localhost',
      port: Number(process.env.PROXY_PORT) || 5000,
    },
    auth: {
        username: process.env.PROXY_USERNAME || '',
        password: process.env.PROXY_PASSWORD || '',
    },
  });

  async get(url: string): Promise<unknown> {
    return await this.axiosInstance.get(url);
  }

  async post<T>(url: string, data?: T): Promise<unknown> {
    return await this.axiosInstance.post(url, data);
  }

}