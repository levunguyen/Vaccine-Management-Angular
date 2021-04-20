import {IImportAndExport} from './IImportAndExport';
import {IVaccine} from './IVaccine';

export interface IStorage {
  storageId: number;
  quantity: number;

  importAndExportList: IImportAndExport[];
  vaccine: IVaccine;
}
