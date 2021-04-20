import {AbstractControl, FormControl} from '@angular/forms';

/** LuyenNT code
 * @param control
 */
export function checkDateOfBirth(control: AbstractControl) {
  const dateOfBirth = new Date(control.value);
  if (new Date().getFullYear() - dateOfBirth.getFullYear() < 18 || new Date().getFullYear() - dateOfBirth.getFullYear() > 50) {
    return {checkAge : true};
  }
  return null;
}
