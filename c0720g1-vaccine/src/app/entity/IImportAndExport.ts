import {IAccount} from './IAccount';
import {IStorage} from './IStorage';

export interface IImportAndExport {
  importAndExportId: number;
  action: string;
  quantity: number;
  date: string;
  price: number;
  deleteFlag: boolean;

  storage: IStorage;
  account: IAccount;
}
