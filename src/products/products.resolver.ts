import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './models/product.model';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/models/user.model';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product', nullable: true })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.MANAGER, Role.STORE_KEEPER)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
