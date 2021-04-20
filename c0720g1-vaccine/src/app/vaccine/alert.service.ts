import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toast: ToastrService) { }
  showMessage(message){
    this.toast.success(message, "Thông báo:");
  }

  showMessageErrors(message){
    this.toast.error(message, "Thông báo:")
  }
}
