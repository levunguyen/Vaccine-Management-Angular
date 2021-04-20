import {IPatient} from './IPatient';
import {IEmployee} from './IEmployee';
import {IAccountRole} from './IAccountRole';
import {IImportAndExport} from './IImportAndExport';

export interface IAccount {
  accountId: number;
  userName: string;
  encryptPw: string;

  patient: IPatient;
  employee: IEmployee;
  accountRoleList: IAccountRole[];
  importAndExportList: IImportAndExport[];
}
