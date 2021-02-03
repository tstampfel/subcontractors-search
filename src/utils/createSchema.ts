import { buildSchema } from "type-graphql";
import { CompanyResolver } from "../modules/company-resolver";
import Container from "typedi";

export const createSchema = async () =>
  buildSchema({
    resolvers: [CompanyResolver],
    container: Container
  });
