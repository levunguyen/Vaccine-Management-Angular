import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';

@Injectable( {
  providedIn: 'root'
})

export class ShowMessage {
  constructor(private toastr: ToastrService) {
  }

  showMessageCreateSuccessfully() {
    this.toastr.success('Đăng ký thành công', 'Đăng ký');
  }


  showMessageCreateError() {
    this.toastr.error('Thêm mới thất bại', 'Thêm mới');
  }


  showMessageNotFound() {
    this.toastr.warning('Không tìm thấy', 'Tìm kiếm');
  }

  showMessageRegisterSuccessfully() {
    this.toastr.success('Đăng ký thành công', 'Thêm mới');
  }

  showMessageRegisterError() {
    this.toastr.error('Đăng ký thất bại', 'Đăng ký');
  }
}
