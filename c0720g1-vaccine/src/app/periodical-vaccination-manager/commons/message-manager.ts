import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class MessageManager {
  constructor(public toastrService: ToastrService) {
  }

  showMessageList(){
    this.toastrService.success('Lịch tiêm chủng định kỳ!', 'Thông báo!');
  }
  showMessageCreate() {
    this.toastrService.success('Thêm mới lịch tiêm chủng định kỳ thành công!', 'Thông báo!');
  }

  showMessageEdit() {
    this.toastrService.success('Cập nhật lịch tiêm chủng định kỳ thành công!', 'Thông báo!');
  }

  showMessageCreateNotRole() {
    this.toastrService.error("Thêm mới thất bại. Bạn đang cố phá hoại", "Thông báo");
  }

  showMessageDelete() {
    this.toastrService.success('Xóa một lịch tiêm chủng định kỳ thành công!', 'Thông báo:');
  }

  showMessageUpdateStatus() {
    this.toastrService.success('Cập nhật trạng thái lịch tiêm chủng định kỳ thành công!', 'Thông báo:');
  }

  showMessageInfoDelete() {
    this.toastrService.info('Bạn đã chọn hủy và lịch tiêm vắc-xin định này đã không được xóa', 'Thông báo hủy.');
  }

  showMessageInfoUpdate() {
    this.toastrService.info('Bạn đã chọn hủy và lịch tiêm vắc-xin định này đã không được cập nhật', 'Thông báo hủy.');
  }

  showSearchWarning() {
    this.toastrService.warning('Thông tin bạn muốn tìm kiếm không tồn tại', 'Thông báo');
  }
}
