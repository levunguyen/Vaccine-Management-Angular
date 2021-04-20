import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodicalVaccinationListComponent } from './periodical-vaccination-list/periodical-vaccination-list.component';
import {PeriodicalVaccinationRoutingModule} from './periodical-vaccination-routing.module';
import { PeriodicalVaccinationRegisterComponent } from './periodical-vaccination-register/periodical-vaccination-register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CancelRegisterComponent } from './cancel-register/cancel-register.component';



@NgModule({
  declarations: [PeriodicalVaccinationListComponent, PeriodicalVaccinationRegisterComponent, CancelRegisterComponent],
  imports: [
    CommonModule,
    PeriodicalVaccinationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PeriodicalVaccinationModule { }
