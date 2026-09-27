
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity.js';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column("int")
  quantity: number;

  @Column()
  availability: boolean;

//   @OneToMany(() => Order, (order) => order.product)
//   orders: Order[];
}
