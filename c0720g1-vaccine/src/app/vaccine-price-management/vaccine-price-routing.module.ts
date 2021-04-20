import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VaccinePriceManagementComponent} from './vaccine-price-management/vaccine-price-management.component';
import {EditVaccinePriceComponent} from "./edit-vaccine-price/edit-vaccine-price.component";


const routes: Routes = [
  {path: 'vaccine-price-list', component: VaccinePriceManagementComponent},
  {path: 'vaccine-price-edit/:id', component: EditVaccinePriceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccinePriceRoutingModule { }
