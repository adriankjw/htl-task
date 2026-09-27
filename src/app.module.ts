import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity.js';
import { Order } from './orders/entities/order.entity.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ProductsModule, OrdersModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Luka1234',
      database: 'customer_portal',
      entities: [Product, Order],
      synchronize: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}