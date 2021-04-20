import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VaccineTransactionManagementRoutingModule} from './vaccine-transaction-management-routing.module';
import { VaccineTransactionManagementComponent } from './vaccine-transaction-management/vaccine-transaction-management.component';
import { CreateVaccineTransactionComponent } from './create-vaccine-transaction/create-vaccine-transaction.component';
import { EditVaccineTransactionComponent } from './edit-vaccine-transaction/edit-vaccine-transaction.component';
import { DeleteVaccineTransactionComponent } from './delete-vaccine-transaction/delete-vaccine-transaction.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [VaccineTransactionManagementComponent, CreateVaccineTransactionComponent, EditVaccineTransactionComponent, DeleteVaccineTransactionComponent],
  exports: [
    VaccineTransactionManagementComponent
  ],
  imports: [
    CommonModule,
    VaccineTransactionManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VaccineTransactionManagementModule { }
