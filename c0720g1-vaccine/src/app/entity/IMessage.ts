import {IPatient} from "./IPatient";

export interface Message {
  messageId: number;
  patient: IPatient;
  content: string;
}
