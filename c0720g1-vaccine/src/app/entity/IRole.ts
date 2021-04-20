import {IAccountRole} from './IAccountRole';

export interface IRole {
  roleId: number;
  name: string;

  accountRoleList: IAccountRole[];
}
