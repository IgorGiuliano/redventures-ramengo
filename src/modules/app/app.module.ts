import { Module } from '@nestjs/common';
import { RamenModule } from '../ramen/ramen.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [RamenModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
