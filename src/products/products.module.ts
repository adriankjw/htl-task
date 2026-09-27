import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

