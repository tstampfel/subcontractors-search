import { Company } from "./../entity/company";
import { Brackets, SelectQueryBuilder } from "typeorm";

export default class CompanyUtils {
    public static createSpecialityQuery(speciality: string[], query:SelectQueryBuilder<Company>):SelectQueryBuilder<Company> {
        
        query = query.andWhere(new Brackets(qb => {
            speciality.forEach((speciality: string, index: number) => {
                if(index === 0){
                    qb.where(`speciality.name = :${["speciality-"+index]}`, {[`speciality-${index}`]: speciality })
                } else {
                    qb.orWhere(`speciality.name = :${["speciality-"+index]}`, {[`speciality-${index}`]: speciality })
                }
            });
        }))

    return query;
    };
}