import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {IEmployeeRoleDTO} from "../entity/IEmployeeRoleDTO";
import {IEmployeeDTO} from "../entity/IEmployeeDTO";

export function birthdayValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    const today = new Date().getFullYear();
    const birthday = parseDate(control.value).getFullYear();
    let age = today - birthday;
    if (age < 18 || age > 100) {
      return {'ageNotEnough': true};
    }
    return null;
  };
  function parseDate(str: string) {
    let dmy = str.split('-');
    return new Date(Number(dmy[0]), Number(dmy[1]) - 1, Number(dmy[2]));
  }
}
export function checkDuplicateEmail(list: IEmployeeDTO[], employee?: IEmployeeDTO): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = control.value;
    if (list) {
      for (const e of list) {
        if (employee === undefined) {
          if (e.idCard === v) {
            return {duplicateEmail : true};
          }
        } else {
          if (e.idCard === v && v !== employee.idCard) {
            return {duplicateEmail : true};
          }
        }
      }
    }
    return null;
  };
}
