import {AbstractControl} from '@angular/forms';

export function checkGuardian(c: AbstractControl) {
  const dateOfBirth = new Date(c.value.dateOfBirth);
  if (dateDiff(dateOfBirth, new Date()) < 18 * 365 && c.value.guardian == '') {
    return {checkGuardian: true};
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
