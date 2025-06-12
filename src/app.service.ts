import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(req: any, res: any) {
    return ("Hello world")
  }
}
