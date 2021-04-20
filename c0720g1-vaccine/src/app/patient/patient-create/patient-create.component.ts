import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PatientService} from "../../service/patient.service";
import {ToastrService} from "ngx-toastr";
import {checkDateOfBirth} from "../../validator/check-date-of-birth";
import {checkGuardian} from "../../validator/check-guardian";
import {AuthService} from "../../service/auth.service";

/**
 * NhiTTY
 **/
@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.scss']
})
export class PatientCreateComponent implements OnInit {
  public patientForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isSubmited = false;
  formValid = false;

  constructor(
              private authService: AuthService,
              private toastr: ToastrService,
              private router:Router) {
  }

  validation_messages = {
    book_id:[
      {type: 'required', message: 'Vui lòng nhập mã sổ tiêm chủng'}
    ],
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
      {type: 'pattern', message: 'Vui lòng nhập số địa thoại đúng định dạng 0xxxxxxxxx or (+84)xxxxxxxx'}
    ],
    address: [
      {type: 'maxlength', message: 'Vui lòng nhập địa chỉ < 200 kí tự'}
    ],
    email: [
      {type: 'required', message: 'Vui lòng nhập email'},
      {type: 'pattern', message: 'Vui lòng nhập email đúng định dạng abcabc@abc.abc'}
    ],
    password:[
      {type: 'required', message: 'Vui lòng nhập mật khẩu'}
    ],
  };


  ngOnInit(): void {
    this.patientForm = new FormGroup(
      {
        book_id:new FormControl('',[Validators.required]),
        name: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.minLength(6), Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")]),
        dateOfBirth: new FormControl('', [Validators.required, checkDateOfBirth]),
        gender: new FormControl('', [Validators.required]),
        guardian: new FormControl('', [Validators.maxLength(40),Validators.minLength(6), Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")]),
        phone: new FormControl('', [Validators.required, Validators.pattern("^(0|\\(\\+84\\))\\d{9}$")]),
        address: new FormControl('', [Validators.maxLength(200)]),
        email: new FormControl('', [Validators.required, Validators.pattern("^\\w{5,}.?\\w+(@\\w{3,8})(.\\w{3,8})+$")]),
        password:new FormControl('',[Validators.required])
      },{validators: checkGuardian}
      );
  }

  onSubmit() {
    if(this.patientForm.invalid){
      console.log(this.patientForm.value)
      this.toastr.warning("Form phải được điền đúng định dạng","Warning:",{
        positionClass:'toast-bottom-right',
        timeOut: 1500,
        extendedTimeOut:1500
      })
    }else{
      this.isSubmited=true;
      this.authService.register(this.patientForm.value).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.toastr.success(data.message,"Hoàn tất: ",{
            positionClass:'toast-bottom-right',
            timeOut: 2500,
            extendedTimeOut:1500
          });
          this.router.navigateByUrl("/verification");

        },
        err => {
          this.toastr.error(err.error.message,'Lỗi: ',{
            positionClass:'toast-bottom-right',
            timeOut: 1500,
            extendedTimeOut:1500
          });
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          this.isSubmited=false;
        }
      );
    }

  }

}
