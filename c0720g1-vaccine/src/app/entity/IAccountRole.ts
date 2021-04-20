import {IAccount} from './IAccount';
import {IRole} from './IRole';

export interface IAccountRole {
  accountRoleId: number;
  account: IAccount;

  role: IRole;
}
