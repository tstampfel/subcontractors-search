import { ObjectType, Field } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
  CreateDateColumn,
} from "typeorm";
import { Company } from "./company";

@ObjectType()
@Entity()
export class City {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  @Index()
  name: string;

  @Field()
  @CreateDateColumn()
  created: Date;

  @OneToMany(() => Company, (company: Company) => company.city)
  company: Company[];
}
