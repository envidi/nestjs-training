import { Injectable } from '@nestjs/common';

@Injectable()
export class DevConfigService {
  DB_HOST = 'localhost';
  async getDBConfig() {
    return this.DB_HOST;
  }
}
