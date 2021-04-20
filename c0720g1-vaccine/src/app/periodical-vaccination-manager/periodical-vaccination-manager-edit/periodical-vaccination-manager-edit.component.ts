import {Component, OnInit} from '@angular/core';
import {IVaccination} from '../../entity/IVaccination';
import {IVaccine} from '../../entity/IVaccine';
import {ILocation} from '../../entity/ILocation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VaccinationManagerService} from '../vaccination-manager.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DateValidator} from '../commons/validatorDate.validator';
import {ValidatorFormGroup} from '../commons/validatorTime.validator';
import {MessageManager} from "../commons/message-manager";

@Component({
  selector: 'app-periodical-vaccination-manager-edit',
  templateUrl: './periodical-vaccination-manager-edit.component.html',
  styleUrls: ['./periodical-vaccination-manager-edit.component.scss']
})
export class PeriodicalVaccinationManagerEditComponent implements OnInit {

  idVaccination: number;
  vaccinations: IVaccination;
  vaccineList: IVaccine[] = [];
  locationList: ILocation[] = [];

  valueAge: string;
  valueNameVaccine: string;
  valueTimes: number;
  valueDuration: number;
  messageError: string;

  formGroup: FormGroup;
  defaultValue = false;

  /**TrungTQ Code: Thông báo validate*/
  statusString: string = 'Chưa thực hiện';
  messageTime: string = 'Thời gian kết thúc phải sau thời gian bắt đầu!';
  timeDurationOne: string = 'Số mũi tiêm nếu bằng có 1 thì ngày tiếp mũi tiếp tiếp theo phải bằng 0';
  timeDurationTwo: string = 'Số mũi tiêm nếu bằng nhiều hơn hoặc bằng 2 thì ngày tiếp mũi tiếp tiếp theo phải lớn hơn 0';

  validate_message = {
    'startTime': [
      {type: 'required', message: 'Trường này không được để trống!'},
    ],
    'endTime': [
      {type: 'required', message: 'Trường này không được để trống!'},
    ],
    'date': [
      {type: 'required', message: 'Trường này không được để trống!'},
      {type: 'dateValid', message: 'Ngày làm lịch tiêm chủng định kỳ không được trước ngày hiện tại!'}
    ],
    'vaccineId': [
      {type: 'required', message: 'Trường này không được để trống!'}
    ],
    // 'locationId': [
    //   {type: 'required', message: 'Trường này không được để trống!'}
    // ],
    'description': [
      {type: 'required', message: 'Ghi chú không được để trống!'},
      {type: 'maxlength', message: 'Không nhập ghi chú quá dài!'},
      {type: 'mminlength', message: 'Không nhập ghi chú quá ngắn!'},
      {type: 'pattern', message: 'Trong ghi chú không kết thúc bằng dấu cách'},
    ]
  };

  constructor(public formBuilder: FormBuilder,
              public vaccinationManagerService: VaccinationManagerService,
              public route: ActivatedRoute,
              public router: Router,
              public messageManager: MessageManager) {
  }

  ngOnInit(): void {
    this.getAllLocation();
    this.getAllVaccine();
    this.idVaccination = this.route.snapshot.params['idVaccinationManager'];
    this.vaccinationManagerService.findByIdVaccination(this.idVaccination).subscribe((data: IVaccination) => {
      this.vaccinations = data;
      console.log(data);
      this.formGroup = this.formBuilder.group({
        vaccinationId: [this.vaccinations.vaccinationId],
        date: [this.vaccinations.date, [Validators.required, DateValidator]],
        vaccineId: [this.vaccinations.vaccine.vaccineId, [Validators.required]],
        // locationId: [this.vaccinations.location.locationId, [Validators.required]],
        startTime: [this.vaccinations.startTime, [Validators.required]],
        endTime: [this.vaccinations.endTime, [Validators.required]],
        description: [this.vaccinations.description, [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      }, {validators: ValidatorFormGroup});
      this.defaultValue = true;
    });
  }

  /**TrungTQ Code: Lấy dữ liệu khi có sự kiện*/
  getValue(vaccineId: any) {
    for (let i = 0; i < this.vaccineList.length; i++) {
      if (this.vaccineList[i].vaccineId == parseInt(vaccineId)) {
        this.valueAge = this.vaccineList[i].age;
        this.valueNameVaccine = this.vaccineList[i].vaccineType.name;
        this.valueTimes = this.vaccineList[i].times;
        this.valueDuration =this.vaccineList[i].duration;
      }
    }
  }

  /**TrungTQ Code: Lấy danh sách địa điểm*/
  getAllLocation() {
    this.vaccinationManagerService.getAllLocation().subscribe((data: ILocation[]) => {
      this.locationList = data;
    });
  };

  /**TrungTQ Code: Lấy danh sách vaccine*/
  getAllVaccine() {
    this.vaccinationManagerService.getAllVaccine().subscribe((data: IVaccine[]) => {
      this.vaccineList = data;
    });
  };

  /**TrungTQ Code: Xong thì quay lại trang chủ*/
  submitForm() {
    if (this.formGroup.invalid) {
      this.messageManager.showMessageCreateNotRole();
      return;
    } else {
      this.vaccinationManagerService.updateVaccinationManager(this.idVaccination, this.formGroup.value).subscribe(data => {
        if (data === null) {
          this.messageError = data[0].defaultMessage;
          this.messageManager.showMessageCreateNotRole();
        } else {
          this.router.navigateByUrl('/periodical-vaccination-manager/list');
          this.messageManager.showMessageEdit();
        }
      });
    }
  }
}
