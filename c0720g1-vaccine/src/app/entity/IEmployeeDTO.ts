import {IPosition} from "./IPosition";
import {IAccount} from "./IAccount";

export interface IEmployeeDTO {
  employeeId: number;
  name: string;
  dateOfBirth: string;
  idCard: string;
  address: string;
  phone: string;
  position: string;
  account: string ;
}
