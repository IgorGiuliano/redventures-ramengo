import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    console.log('createOrderDto:', createOrderDto);
    const orderId = await this.ordersService.createOrder(createOrderDto);
    return { confirmationCode: orderId };
  }
}
