import {IVaccinationHistory} from './IVaccinationHistory';

export interface IVaccinationTransaction {
  vaccinationTransactionId: number;
  price: number;
  quantity: number;

  vaccinationHistory: IVaccinationHistory;
}
