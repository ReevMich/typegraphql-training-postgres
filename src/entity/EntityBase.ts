import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Field, InterfaceType, ID } from "type-graphql";

@InterfaceType()
export abstract class IBaseEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;
    
    @Field()
    @CreateDateColumn()
    createDate: Date;
    
    @Field()
    @UpdateDateColumn()
    updateDate: Date;

}