import { Module } from '@nestjs/common';
import { RamenController } from './ramen.controller';
import { RamenService } from './ramen.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [RamenController],
  imports: [HttpModule],
  providers: [RamenService],
})
export class RamenModule {}
