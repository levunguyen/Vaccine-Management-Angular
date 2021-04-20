import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SecurityRoutingModule} from "./security-routing.module";
import {RegisterComponent} from "./register/register.component";
import {VerificationComponent} from "./verification/verification.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import { VerifyResetPasswordComponent } from './verify-reset-password/verify-reset-password.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, VerificationComponent,ResetPasswordComponent, VerifyResetPasswordComponent],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ]
})
export class SecurityModule {
}
