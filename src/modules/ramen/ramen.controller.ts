import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { RamenService } from './ramen.service';
import { Response } from 'express';

@Controller()
export class RamenController {
  constructor(private readonly ramenService: RamenService) {}

  @Get('broths')
  async getBroths(@Res() res: Response) {
    try {
      const broths = await this.ramenService.getBroths();
      return res.status(HttpStatus.OK).json(broths);
    } catch (error) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ error: 'x-api-key header missing' });
    }
  }

  @Get('proteins')
  async getProteins(@Res() res: Response) {
    try {
      const proteins = await this.ramenService.getProteins();
      return res.status(HttpStatus.OK).json(proteins);
    } catch (error) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ error: 'x-api-key header missing' });
    }
  }
}
