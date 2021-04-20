import {AbstractControl} from '@angular/forms';

export function ValidatorFormGroup(control: AbstractControl): { [key: string]: boolean } | null {
  /**TrungTQ Code: Valid thời gian bắt đầu vào phải sau thời gian kết thúc*/
  let start = new Date();
  let startTime = control.get('startTime').value.toString().split(':');
  start.setHours((parseInt(startTime[0]) - 1 + 24) % 24);
  start.setMinutes(parseInt(startTime[1]));

  let end = new Date();
  let endTime = control.get('endTime').value.toString().split(':');
  end.setHours((parseInt(endTime[0]) - 1 + 24) % 24);
  end.setMinutes(parseInt(endTime[1]));

  if (startTime > endTime) {
    return {
      timeValid: true
    };
  }

  /**TrungTQ Code: Số mũi tiêm gần với thực tế*/

  // let times = control.get('times');
  // let duration = control.get('duration');
  // if (times.value == 1 && duration.value != 0){
  //   return {
  //     timeDurationOne: true
  //   }
  // } else if (times.value >= 2 && duration.value == 0 ){
  //     return {
  //       timeDurationTwo: true
  //     }
  // }


  return null;
}
