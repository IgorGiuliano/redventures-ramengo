import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { HttpModule } from '@nestjs/axios';
import { RamenService } from '../ramen/ramen.service';

@Module({
  controllers: [OrdersController],
  imports: [HttpModule],
  providers: [OrdersService, RamenService],
})
export class OrdersModule {}
