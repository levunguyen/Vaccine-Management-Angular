import {IVaccination} from './IVaccination';

export interface IVaccinationType {
  vaccinationTypeId: number;
  name: string;

  vaccinationList: IVaccination[];
}
