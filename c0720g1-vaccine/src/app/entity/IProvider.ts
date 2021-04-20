import {IInvoice} from './IInvoice';

export interface IProvider {
  providerId: number;
  name: string;

  invoiceList: IInvoice[];
}
