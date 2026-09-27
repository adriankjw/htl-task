import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { DataSource } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { HttpService } from '@nestjs/axios';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable()
export class ProductsService {
  BASE_URL = "http://localhost:3001";

  _dataSource: DataSource;

  constructor(private readonly httpService: HttpService) {
    this.httpService = httpService;
  }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  async findOne(sku: string) {
    try {
      const authUrl = this.BASE_URL + '/auth/login';
      
      // Form data payload
      const payload = {
        email: 'admin@shop.test',
        password: 'password123'
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      const { data } = await firstValueFrom(
        this.httpService.post(authUrl, payload, { headers }).pipe(
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

      const productUrl = this.BASE_URL + `/products/${sku}`;

      console.log(sku);

      const response = await firstValueFrom(
        this.httpService.get(productUrl, {
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${access_token}`,
          },
        }),
      );

      console.log(response);
      return response.data;
    } catch(e) {
      console.log(e);
    }
    
    // const product = await this._dataSource
    //   .createQueryBuilder(Product, 'product')
    //   .where('product.sku = :sku', { sku })
    //   .getOne();

    // if (!product) {
    //   throw new NotFoundException(`Product with SKU "${sku}" not found`);
    // }

    // return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // const sku = updateProductDto.sku;
    // const product = await this._dataSource
    //   .createQueryBuilder(Product, 'product')
    //   .where('product.sku = :sku', { sku })
    //   .getOne();

    // if (!product) {
    //   throw new NotFoundException(`Product with SKU "${sku}" not found`);
    // }

    // const quantity = updateProductDto.quantity? - 1 : updateProductDto.quantity;

    // await this._dataSource
    //   .createQueryBuilder()
    //   .update(Product)
    //   .set({ 
    //     quantity: quantity
    //   })
    //   .where("id = :id", { id: updateProductDto.id }) // Always filter by ID or primary key!
    //   .execute();

    //     return product;
    }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
