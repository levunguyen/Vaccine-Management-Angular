import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisteredForVaccinationRoutingModule} from "./registered-for-vaccination-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ViewRegisteredRequiredVaccinationComponent } from './view-registered-required-vaccination/view-registered-required-vaccination.component';
import {RegisteredRequiredVaccinationComponent} from "./registered-required-vaccination/registered-required-vaccination.component";


@NgModule({
  imports: [
    CommonModule,
    RegisteredForVaccinationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [ViewRegisteredRequiredVaccinationComponent, RegisteredRequiredVaccinationComponent]
})
export class RegisteredForVaccinationModule { }
