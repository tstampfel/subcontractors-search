import { ObjectType, Field } from "type-graphql";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city";
import { Speciality } from "./speciality";

@Entity()
@ObjectType()
export class Company {
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

  @Field(() => Speciality)
  @ManyToOne(() => Speciality, (speciality: Speciality) => speciality.name,{cascade: true, nullable: true} )
  speciality: Speciality;

  @Field(() => City)
  @ManyToOne(() => City, (city: City) => city.name,{cascade: true} )
  city: City;
}


