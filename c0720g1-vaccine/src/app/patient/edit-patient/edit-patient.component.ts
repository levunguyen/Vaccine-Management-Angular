import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {PatientService} from "../../service/patient.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {checkDateOfBirth} from "../../validator/checkDateOfBirth";
import {checkGuardian} from "../../validator/checkGuardian";


@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  formGroup: FormGroup;
  patientId;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      patientId: [''],
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(5),
        Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")]),
      dateOfBirth: new FormControl('', [
        Validators.required,
        checkDateOfBirth]),
      gender: new FormControl('', [Validators.required]),
      guardian: new FormControl('', [
        Validators.maxLength(40),
        Validators.minLength(5),
        Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern("^(0|\\(\\+84\\))\\d{9}$")]),
      address: new FormControl('', [
        Validators.maxLength(200)]),
      email: new FormControl('', [
        Validators.required,
        Validators.email])
    }, {validators: checkGuardian});
    this.patientService.getPatientById(this.route.snapshot.paramMap.get('id')).subscribe(data => {
      console.log(this.formGroup.patchValue(data));
      console.log(data);
    });
  }

  editPatient() {

    this.patientService.editPatient(this.formGroup.value, this.formGroup.value.patientId).subscribe(data => {
      this.router.navigateByUrl('/patient/list');
    });

    this.toastr.success('Sửa Thông Tin Thành Công !', 'Thông Báo!');
  }

  validation_messages = {
    name: [
      {type: 'required', message: 'Vui lòng nhập tên'},
      {type: 'maxlength', message: 'Vui lòng nhập tên không quá 40 kí tự.'},
      {type: 'minlength', message: 'Vui lòng nhập tên có ít nhất 6 kí tự'},
      {type: 'pattern', message: 'Vui lòng nhập tên đúng'}
    ],
    dateOfBirth: [
      {type: 'required', message: 'Vui lòng nhập ngày sinh'},
    ],
    gender: [
      {type: 'required', message: 'Vui lòng chọn giới tính'},
    ],
    guardian: [
      {type: 'maxlength', message: 'Vui lòng nhập người giám hộ không quá 40 kí tự'},
      {type: 'minlength', message: 'Vui lòng nhập tên có ít nhất 6 kí tự'},
      {type: 'pattern', message: 'Vui lòng nhập tên người giám hộ đúng'}
    ],
    phone: [
      {type: 'required', message: 'Vui lòng nhập số điện thoại'},
      {type: 'pattern', message: 'Vui lòng nhập số điện thoại đúng định dạng 0xxxxxxxxx or (+84)xxxxxxxx'}
    ],
    address: [
      {type: 'maxlength', message: 'Vui lòng nhập địa chỉ < 200 kí tự'}
    ],
    email: [
      {type: 'required', message: 'Vui lòng nhập email'},
      {type: 'email', message: 'Vui lòng nhập email đúng định dạng abc@abc.abc'}
    ],
  };
}
