import {IAccount} from './IAccount';
import {IPosition} from './IPosition';

export interface IEmployee {
  employeeId: number;
  name: string;
  dateOfBirth: string;
  idCard: string;
  address: string;
  phone: string;
  deleteFlag: boolean;

  position: IPosition;
  account: IAccount;
}
