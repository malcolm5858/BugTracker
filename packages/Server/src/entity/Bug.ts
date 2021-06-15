import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./Project";
import { Tag } from "./Tag";

@ObjectType()
@Entity()
export class Bug extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @OneToMany(() => Tag, (crt) => crt.bug)
  tags: Promise<Tag[]>;

  @ManyToOne(() => Project, (crp) => crp.bugs, { onDelete: "CASCADE" })
  project: Promise<Project>;
}
