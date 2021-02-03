import { ICity } from "./ICity";
import { ISpeciality } from "./ISpeciality";

export interface ISubcontractor {
  name: string;
  speciality: ISpeciality;
  city: ICity;
}
