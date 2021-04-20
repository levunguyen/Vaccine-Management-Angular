import {AbstractControl, FormControl} from '@angular/forms';

export function checkDateVaccination(control: AbstractControl) {

  const dateVaccination = new Date(control.value);

  if (dateDiff( dateVaccination, new Date()) > 0 ) {
    return {checkDateVaccination : true};
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
