import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})


export class ResetPasswordComponent implements OnInit {
formGroup:FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isSubmited = false;
  formValid = false;
  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private toastr:ToastrService,
              private router:Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username:['']
    })

  }

  onSubmit() {
    this.isSubmited=true;
    this.authService.resetPassword(this.formGroup.value.username).subscribe(
      data => {
        this.toastr.success("Email đã được gửi!","Thành công: ",{
          timeOut: 2500,
          extendedTimeOut:1500
        });
        this.router.navigateByUrl("/verify-reset-password");
      },
      err => {
        this.toastr.error("Sai tên đăng nhập hoặc tên đăng nhập chưa được đăng ký","Gửi email thất bại: ",{
          timeOut: 3000,
          extendedTimeOut:1500
        });
      }
    );
  }
}
