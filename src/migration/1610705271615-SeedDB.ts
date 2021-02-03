import { Speciality } from "../entity/speciality";
import {getRepository, MigrationInterface} from "typeorm";
import { CitiesSeed, CompaniesSeed, SpecialitiesSeed } from "../seed/company-seed";
import { City } from "../entity/city";
import { Company } from "../entity/company";

export class SeedDB1610705271615 implements MigrationInterface {

    public async up(): Promise<void> {
        console.log("Starting database seeding!")
        let specialityArray: any[] = [];
        let citiesArray: any[] = [];
        let companiesArray: any[] = [];

        for (let i = 0; i < SpecialitiesSeed.length; i++) {
            specialityArray.push({name: SpecialitiesSeed[i].name});
        }
        for (let i = 0; i < CitiesSeed.length; i++) {
            citiesArray.push({name: CitiesSeed[i].name});
        }
        await getRepository(Speciality).save(specialityArray);
        await getRepository(City).save(citiesArray);
        for (let i = 0; i < CompaniesSeed.length; i++) {
            companiesArray.push({name: CompaniesSeed[i].name + " " + i, speciality: specialityArray[Math.floor(Math.random() * SpecialitiesSeed.length)], city: citiesArray[Math.floor(Math.random() * CitiesSeed.length)]});
        }
        await getRepository(Company).save(companiesArray);
        console.log("DataBase seeded")
    }

    public async down(): Promise<void> {
    }

}
