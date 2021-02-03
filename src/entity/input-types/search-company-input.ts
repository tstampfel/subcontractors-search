
import { Field, InputType } from "type-graphql";

@InputType()
export class SearchCompanyInput  {
  @Field()
  searchText: string;

  @Field(() => [String],{ nullable: true })
  speciality: string[];
  
  @Field({ nullable: true })
  city: string;
}
