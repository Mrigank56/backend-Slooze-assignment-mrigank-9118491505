import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum Role {
  MANAGER = 'MANAGER',
  STORE_KEEPER = 'STORE_KEEPER',
}

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field(() => Role)
  role: Role;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
