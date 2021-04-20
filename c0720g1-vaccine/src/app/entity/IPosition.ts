import {IEmployee} from './IEmployee';

export interface IPosition {
  positionId: number;
  name: string;

  employeeList: IEmployee[];
}
