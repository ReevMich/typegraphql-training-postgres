import { Entity, Column } from "typeorm";
import { ObjectType, Field, Root } from "type-graphql";
import { IBaseEntity } from "./EntityBase";

@ObjectType({implements: IBaseEntity})
@Entity()
export class User extends IBaseEntity {
  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
}
