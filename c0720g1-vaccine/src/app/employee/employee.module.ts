import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import {RouterModule} from "@angular/router";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import {EmployeeRoutingModule} from './employee-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [EmployeeListComponent, EmployeeEditComponent, EmployeeCreateComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    EmployeeRoutingModule,
    NgxPaginationModule
  ]
})
export class EmployeeModule { }
