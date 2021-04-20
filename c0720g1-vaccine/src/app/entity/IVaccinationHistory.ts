import {IVaccination} from './IVaccination';
import {IPatient} from './IPatient';
import {IVaccinationTransaction} from './IVaccinationTransaction';

export interface IVaccinationHistory {
  vaccinationHistoryId: number;
  status: boolean;
  dosage: number;
  preStatus: string;
  afterStatus: string;
  vaccination: IVaccination;
  patient: IPatient;
  vaccinationTransaction: IVaccinationTransaction;
  startTime: string;
  endTime: string;
  vaccinationTimes: number;
}
