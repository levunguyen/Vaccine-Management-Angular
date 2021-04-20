import {Component, OnInit} from '@angular/core';
import {VaccinationManagerService} from '../vaccination-manager.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateSearchValidator} from '../commons/validatorDate.validator';
import {MessageManager} from "../commons/message-manager";

@Component({
  selector: 'app-periodical-vaccination-manager-list',
  templateUrl: './periodical-vaccination-manager-list.component.html',
  styleUrls: ['./periodical-vaccination-manager-list.component.scss']
})
export class PeriodicalVaccinationManagerListComponent implements OnInit {
  vaccinationId: number;
  locationName: string;
  vaccineTypeName: string;
  vaccineName: string;
  dateVaccination: string;

  formGroup: FormGroup;
  str = 'Ngày';
  public startDate = '';
  public endDate = '';
  public name = '';
  public status = '';
  listVaccination;

  constructor(private vaccinationManagerService: VaccinationManagerService,
              public formBuilder: FormBuilder,
              public messageManager: MessageManager) {
  }

  ngOnInit(): void {
    this.ngSubmit();
    this.searchDateAndNameOrStatus(0, 1);

  }

  validate_message = {
    'startDateInput': [
      {type: 'required', message: 'Trường này không được để trống!'},
    ],
    'endDateInput': [
      {type: 'required', message: 'Trường này không được để trống!'},
    ],
    'nameInput': [
      {type: 'maxlength', message: 'Số ký tự tối đa không quá 10 ký tự!'},
    ]
  };

  ngSubmit() {
    this.formGroup = this.formBuilder.group({
      startDateInput: ['', [Validators.required]],
      endDateInput: ['', [Validators.required]],
      nameInput: ['', Validators.maxLength(10)],
      statusInput: [''],
    }, {validators: DateSearchValidator});
    this.getAllVaccinationManager(0, 1);
  }

  /**TrungTQ Code: Tìm kiếm và phân trang*/
  searchDateAndNameOrStatus(pageable, type) {
    if (this.startDate === '' && this.endDate === '' && this.name === '' && this.status === '') {
      this.getAllVaccinationManager(pageable, type)
    } else {
      this.searchVaccinationManager(pageable, type);
    }
  }

  /**TrungTQ Code: Hiện danh sách và phân trang*/
  getAllVaccinationManager(pageable, type) {
    this.startDate = '';
    this.endDate = '';
    this.name = '';
    this.status = '';
    this.vaccinationManagerService.getAllVaccination(pageable, type).subscribe(data => {
      this.listVaccination = data;
      console.log(data);
    }, error => console.log(error));
  }

  /**TrungTQ Code: Hiện danh sách tìm kiếm*/
  searchVaccinationManager(pageable, type) {
    this.vaccinationManagerService.searchDateAndNameOrStatus(this.startDate, this.endDate, this.name, this.status, pageable, type).subscribe(data => {
      if (data === null) {
        this.messageManager.showSearchWarning();
        this.getAllVaccinationManager(pageable, type);
      } else {
        this.listVaccination = data;
      }
    });
  }

  /**TrungTQ Code: Xóa theo biến flag*/
  deleteVaccinationManager() {
    this.vaccinationManagerService.deleteVaccinationManager(this.vaccinationId).subscribe(data => {
      this.ngOnInit();
      this.messageManager.showMessageDelete();
    });
  }

  /**TrungTQ Code: Cập nhật trạng thái*/
  updateVaccinationStatusManager() {
    this.vaccinationManagerService.updateVaccinationManagerStatus(this.vaccinationId).subscribe(data => {
      this.ngOnInit();
      this.messageManager.showMessageUpdateStatus();
    });
  }

  /**TrungTQ Code: Hiện nội dung sau khi muốn xóa hay muốn câp nhập trạng thái*/
  getContentVaccination(id: number, date: string, location: string, vaccineType: string, vaccine: string) {
    this.vaccinationId = id;
    this.locationName = location;
    this.vaccineTypeName = vaccineType;
    this.vaccineName = vaccine;
    this.dateVaccination = date;
  }

  /**TrungTQ Code: Cắt bớt tên vaccine*/
  getShortName(name: string, size: number): string {
    let nameStr = name;
    if (name.length > size) {
      return nameStr.substring(0, size).concat('...');
    } else {
      return name;
    }
  }

  /**TrungTQ Code: Hiện Mã ID */
  getCode(id: number, size: number): string {
    let num = id.toString();
    while (num.length < size) {
      num = '0' + num;
    }
    return 'LTC-' + num;
  }

  /**TrungTQ Code: Thông báo khi hủy xóa*/
  getMessageDelete() {
    this.messageManager.showMessageInfoDelete();
  }

  /**TrungTQ Code: Thông báo khi hủy cập nhật*/
  getMessageUpdate() {
    this.messageManager.showMessageInfoUpdate();
  }
}
