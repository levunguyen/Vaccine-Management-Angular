import {IVaccine} from './IVaccine';

export interface IVaccineType {
  vaccineTypeId: number;
  name: string;

  vaccineList: IVaccine[];
}
