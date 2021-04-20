import {AbstractControl, FormControl} from '@angular/forms';

export function checkDayExpired(control: AbstractControl): { [key: string]: boolean } | null {
  let dayReceive = control.get('dateReceive');
  let dayExpired = control.get('expired');
  if (dayExpired.value > dayReceive.value) {
    return {
      dayExpired: true
    };
  }
  return {}
}
