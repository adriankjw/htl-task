import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';

@Injectable()
export class OrdersService {
    BASE_URL = "http://localhost:3001";
  
    constructor(private readonly httpService: HttpService) {
      this.httpService = httpService;
    }
  //   _dataSource: DataSource;

  // constructor(private dataSource: DataSource, @InjectRepository(Product)
  // private readonly userRepository: Repository<Product>,) {
  //   this._dataSource = dataSource;
  // }

  async create(createOrderDto: CreateOrderDto) {
  //   const sku = createOrderDto.sku
  //     const product = await this._dataSource
  //       .createQueryBuilder(Product, 'product')
  //       .where('product.sku = :sku', { sku })
  //       .getOne();
  
  //     if (!product) {
  //       throw new NotFoundException(`Product with SKU "${sku}" not found`);
  //     }

  //     if (createOrderDto.quantity > product.quantity) {
  //       throw new BadRequestException(`Insufficient stock for product`)
  //     }

  // await this._dataSource
  //   .createQueryBuilder(Order, "order")
  //   .insert()
  //   .into(Order)
  //   .values([
  //     { quantity: createOrderDto.quantity,
  //       product: product
  //      },
  //   ])
  //   .execute();

    console.log("ABC");
    
    const authUrl = this.BASE_URL + '/auth/login';
    
    // Form data payload
    const authPayload = {
      email: 'admin@shop.test',
      password: 'password123'
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    console.log("ABC");

    const { data } = await firstValueFrom(
      this.httpService.post(authUrl, authPayload, { headers }).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(
            error.response?.data || 'External Authentication Failed',
            error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );

    console.log(data);

    const access_token = data["accessToken"];

    console.log(access_token);

    const orderUrl = this.BASE_URL + `/sales-orders`;

    console.log("-------");
    console.log(createOrderDto);
    console.log(createOrderDto.sku);
    console.log(createOrderDto.quantity);

    // Form data payload
    const orderPayload = {
      "customerId": "23434127-dc92-4d61-a2a7-5cd707ea69fe",
      "warehouseId": "767fb69a-8ac1-4bb1-9cdb-0914c7fa93e8",
      "items": [
        {
          "sku": createOrderDto.sku,
          "quantity": createOrderDto.quantity
        }
      ]
    };

    const response = await firstValueFrom(
      this.httpService.post(orderUrl, orderPayload, { 
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${access_token}`,
        }, }).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(
            error.response?.data || 'External Authentication Failed',
            error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );

    console.log(response.data);
    return data;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
