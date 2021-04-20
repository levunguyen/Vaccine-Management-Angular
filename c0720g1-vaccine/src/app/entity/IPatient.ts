import {IAccount} from './IAccount';
import {IVaccinationHistory} from './IVaccinationHistory';

export interface IPatient {
  patientId: number;
  name: string;
  dateOfBirth: string;
  gender: string;
  guardian: string;
  phone: string;
  address: string;
  email: string;
  deleteFlag: boolean;

  vaccinationHistoryList: IVaccinationHistory[];
  account: IAccount;
}
