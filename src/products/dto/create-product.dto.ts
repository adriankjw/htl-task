import { PrimaryGeneratedColumn, Column } from "typeorm";

export class CreateProductDto {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    sku: string;
    
    @Column()
    quantity: number;
}
