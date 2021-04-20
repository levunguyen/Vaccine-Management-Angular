/**
 * VaccinationHistoryRegistered : create by LongBP
 */

export interface IVaccinationHistoryRegisteredDTO {

  vaccinationHistoryId : number;

  patientId : number;

  patientName : string;

  patientDob : string;

  patientGender : boolean;

  patientGuardian : string;

  patientPhone : string;

  patientAddress : string;

  vaccineName : string;

  vaccineTypeName : string;

  vaccinationHistoryStatus : boolean;

  endTime : string;

  dosage : string;

  preStatus : string;

  afterStatus : string;

  vaccinationTimes : number;

}
