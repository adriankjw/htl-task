import { from } from "rxjs";
import { IsNumber, IsNotEmpty } from "class-validator"

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  readonly sku: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number; 
}
