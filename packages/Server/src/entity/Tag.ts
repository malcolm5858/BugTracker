import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bug } from "./Bug";

@ObjectType()
@Entity()
export class Tag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  color: string;

  @Field()
  @Column()
  type: string;

  @ManyToOne(() => Bug, (crb) => crb.tags)
  bug: Promise<Bug>;
}
