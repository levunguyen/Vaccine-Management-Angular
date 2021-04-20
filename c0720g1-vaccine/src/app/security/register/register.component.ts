import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
@Injectable( {
  providedIn: 'root'
})
export class RegisterComponent implements OnInit {
  formGroup:FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isSubmited = false;
  formValid = false;
  constructor(private formBuild: FormBuilder,
              private authService: AuthService,
              private toastr: ToastrService,
              private router:Router) { }

  validation_messages = {
    'password':[
      {type: 'required',message: 'Trường này không được để trống!'},
      {type: 'minlength', message: 'Mật khẩu nhiều hơn 8 ký tự'},
      {type: 'maxlength', message: 'Mật khẩu ít hơn 32 ký tự'},
    ],
    'email':[
      {type: 'required',message: 'Trường này không được để trống!'},
      {type:'pattern',message: 'Email sai định dạng' }
    ],
    gender: [{
      
    }]
  };
  ngOnInit(): void {
    //  declare form group by Linh
    this.formGroup = this.formBuild.group({
        password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(32)]],
        email:['',[Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
        name:[''],
        gender:['',[Validators.required]],
        
      }
    );

  }

  onSubmit() {
    if(this.formGroup.invalid){
     this.toastr.warning("Form phải được điền đúng định dạng","Warning:",{
       positionClass:'toast-bottom-right',
       timeOut: 1500,
       extendedTimeOut:1500
     })
    }else{
      this.isSubmited=true;
      this.authService.register(this.formGroup.value).subscribe(
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
