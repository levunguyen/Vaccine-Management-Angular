import {AbstractControl, FormControl} from '@angular/forms';

export function checkDateOfBirth(control: AbstractControl) {

  const dateOfBirth = new Date(control.value);

  if (dateDiff( dateOfBirth, new Date()) < 90 || dateDiff( dateOfBirth, new Date()) > 36525) {
    return {checkAge : true};
  }

  return null;

}

function parseDate(str: string) {
  let dmy = str.split('-');
  return new Date(Number(dmy[0]), Number(dmy[1]) - 1, Number(dmy[2]));
}


function dateDiff(first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}
