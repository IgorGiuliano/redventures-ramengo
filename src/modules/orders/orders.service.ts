import {
  Inject,
  Injectable,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { RamenService } from '../ramen/ramen.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => RamenService))
    private readonly ramenService: RamenService,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<{ id: string; description: string; image: string }> {
    if (!createOrderDto.brothId || !createOrderDto.proteinId) {
      throw new HttpException(
        'Broth ID and Protein ID are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const brothId = createOrderDto.brothId;
    const proteinId = createOrderDto.proteinId;

    const response: AxiosResponse = await this.httpService
      .post(
        `${process.env.API_URL}/orders/generate-id`,
        {},
        { headers: { 'x-api-key': process.env.API_KEY } },
      )
      .toPromise();

    const broths = await this.ramenService.getBroths();
    const proteins = await this.ramenService.getProteins();

    const selectedBroth = broths.find((broth) => broth.id === brothId);
    const selectedProtein = proteins.find(
      (protein) => protein.id === proteinId,
    );

    if (!selectedBroth || !selectedProtein) {
      throw new HttpException(
        'Invalid broth or protein selection',
        HttpStatus.BAD_REQUEST,
      );
    }

    const order = {
      id: response.data.orderId,
      description: `${selectedBroth.name} and ${selectedProtein.name}`,
      image: 'https://tech.redventures.com.br/icons/ramen/ramenChasu.png',
    };

    return order;
  }
}
