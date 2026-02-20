import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => Float)
  @Min(0)
  price: number;

  @Field(() => Int)
  @Min(0)
  stock: number;
}
