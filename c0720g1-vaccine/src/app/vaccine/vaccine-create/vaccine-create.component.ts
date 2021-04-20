import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VaccineService} from "../vaccine.service";
import {Router} from "@angular/router";
import {AlertService} from "../alert.service";
import {IVaccineDTO} from "../../entity/IVaccineDTO";

@Component({
  selector: 'app-vaccine-create',
  templateUrl: './vaccine-create.component.html',
  styleUrls: ['./vaccine-create.component.scss']
})
export class VaccineCreateComponent implements OnInit {
  formCreateVaccine: FormGroup;
  listVaccine: IVaccineDTO[] = [];
  flag: boolean = false;

  constructor(private vaccineService: VaccineService,
              private router: Router,
              private alertService: AlertService) {
  }

  validation_messages = {
    nameVaccine: [
      {type: 'required', message: 'Vui lòng nhập tên'},
      {type: 'minlength', message: 'Vui lòng nhập tên có ít nhất 4 kí tự'},
      {type: 'pattern', message: 'Vui lòng nhập tên đúng'}
    ],
    typeVaccine: [
      {type: 'required', message: 'Vui lòng nhập loại vắc-xin'},
      {type: 'minlength', message: 'Vui lòng nhập tên có ít nhất 4 kí tự'},
      {type: 'pattern', message: 'Vui lòng nhập loại vắc-xin đúng'}
    ],
    dayReceive: [
      {type: 'required', message: 'Vui lòng nhập thời gian giao'},
    ],
    licenseCode: [
      {type: 'required', message: 'Vui lòng nhập loại số giấy phép'},
      {type: 'pattern', message: 'Vui lòng nhập số giấy phép lớn hơn 0'}
    ],
    origin: [
      {type: 'required', message: 'Vui lòng nhập nước sản xuất'},
      {type: 'pattern', message: 'Vui lòng nhập nước sản xuất đúng'},
      {type: 'minlength', message: 'Vui lòng nhập tên có ít nhất 2 kí tự'},
    ],
    provider: [
      {type: 'required', message: 'Vui lòng nhập nhà cung cấp'},
      {type: 'pattern', message: 'Vui lòng nhập nhà cung cấp đúng'},
      {type: 'minlength', message: 'Vui lòng nhập tên có ít nhất 4 kí tự'},
    ],
    unitPrice: [
      {type: 'required', message: 'Vui lòng nhập giá'},
      {type: 'min', message: 'Vui lòng nhập giá lớn hơn hoặc bằng 0'},
    ],
    dosage: [
      {type: 'required', message: 'Vui lòng nhập liều lượng'},
      {type: 'min', message: 'Vui lòng nhập liều lượng lớn hơn hoặc bằng 0'},
    ],
    quantity: [
      {type: 'required', message: 'Vui lòng nhập số lượng'},
      {type: 'min', message: 'Vui lòng nhập số lượng lớn hơn hoặc bằng 0'},
    ],
    maintenance: [
      {type: 'required', message: 'Vui lòng nhập điều kiện bảo quản'},
    ],
    age: [
      {type: 'required', message: 'Vui lòng nhập độ tuổi tiêm chủng'},
    ],
    expired: [
      {type: 'required', message: 'Vui lòng nhập thời gian hết hạn'},
    ],
  };

  ngOnInit(): void {
    this.formCreateVaccine = new FormGroup({
      nameVaccine: new FormControl('', [Validators.required,
        Validators.minLength(4)]),
      typeVaccine: new FormControl('', [Validators.required,
        Validators.minLength(4)]),
      dayReceive: new FormControl('', [Validators.required]),
      licenseCode: new FormControl('', [Validators.required, Validators.min(1)]),
      origin: new FormControl('', [Validators.required,
        Validators.minLength(1),
        Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")]),
      provider: new FormControl('', [Validators.required,
        Validators.minLength(4)]),
      unitPrice: new FormControl('', [Validators.required,
        Validators.min(0)]),
      dosage: new FormControl('', [Validators.required,
        Validators.min(0)]),
      quantity: new FormControl('', [Validators.required,
        Validators.min(0)]),
      expired: new FormControl('', [Validators.required]),
      maintenance: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      times: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required])
    });
  }


  save() {
    this.vaccineService.getAllVaccineNotPagination().subscribe((data: IVaccineDTO[]) => {
      this.listVaccine = data;
      console.log(this.listVaccine);
    });
    for (let vaccine of this.listVaccine) {
      if (vaccine.name == this.formCreateVaccine.value.nameVaccine) {
        this.flag = true;
        break;
      }
    }
    if (this.flag == false) {
      console.log(this.formCreateVaccine.value);
      this.vaccineService.createVaccineDTO(this.formCreateVaccine.value).subscribe(() => {
        this.router.navigateByUrl('vaccine-list').then(r => this.alertService.showMessage("Thêm mới thành công!"));
      })
    } else {
       this.alertService.showMessageErrors("Trùng lặp vắc-xin");
    }
  }
}
