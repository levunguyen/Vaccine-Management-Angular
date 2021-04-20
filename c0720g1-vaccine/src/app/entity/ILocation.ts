import {IVaccination} from './IVaccination';

export interface ILocation {
  locationId: number;
  name: string;

  vaccinationList: IVaccination[];
}
