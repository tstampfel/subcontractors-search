import { ObjectType, Field } from "type-graphql";
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company";

@Entity()
@ObjectType()
export class Speciality {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  readonly id?: string;

  @Field()
  @Column()
  @Index()
  name: string;

  @Field()
  @CreateDateColumn()
  created: Date;

  @OneToMany(() => Company, (company: Company) => company.speciality)
  company: Company[];
}


