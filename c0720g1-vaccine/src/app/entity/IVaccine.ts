import {IInvoice} from './IInvoice';
import {IVaccination} from './IVaccination';
import {IStorage} from './IStorage';
import {IVaccineType} from './IVaccineType';

export interface IVaccine {
  vaccineId: number;
  name: string;
  licenseCode: string;
  origin: string;
  age: string;
  maintenance: string;
  dosage: number;
  deleteFlag: boolean;
  expired:String;
  quantity:number,
  invoiceList: IInvoice[];
  vaccineType: IVaccineType;
  vaccinationList: IVaccination[];
  storageList: IStorage[];
  times: number;
  duration: number;
}
