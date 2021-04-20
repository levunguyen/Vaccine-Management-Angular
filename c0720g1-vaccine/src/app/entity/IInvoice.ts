import {IProvider} from './IProvider';
import {IVaccine} from './IVaccine';

export interface IInvoice {
  invoiceId: number;
  transactionDate: string;
  price: number;
  expired: string;
  deleteFlag: boolean;
  quantity: number;

  provider: IProvider;
  vaccine: IVaccine;
}
