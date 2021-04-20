import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toast: ToastrService
  ) { }
  showAlertSuccess(message){
    this.toast.success(message, 'Thông báo:');
  }
}
