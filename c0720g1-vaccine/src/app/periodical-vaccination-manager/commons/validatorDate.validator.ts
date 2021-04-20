import {AbstractControl} from '@angular/forms';
/**TrungTQ Code: Hiện thông báo Valid ngày bắt đầu tìm kiếm phải trước ngày kết thúc*/
export function DateSearchValidator(control: AbstractControl): { [key: string]: boolean } | null {

  let fromDate = control.get('startDateInput');
  let toDate = control.get('endDateInput');
  if (fromDate.value > toDate.value) {
    return {
      dateSearchValid: true
    };
  }
  return {};
}
/**TrungTQ Code: Hiện thông báo ngày nhập vào phải sau ngày hôm nay*/
export function DateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  let  date = control.value;
  let current = new Date();
  if (new Date(date) < current) {
    return {
      dateValid: true
    };
  }
  return null;
}

