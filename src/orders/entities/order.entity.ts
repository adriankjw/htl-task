
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity.js';
import { ManyToOne } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('Product', (product: any) => product.orders)
  product: Product; 

  @Column()
  quantity: number;
}
