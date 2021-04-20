import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaccinationByRequestListComponent } from './vaccination-by-request-list/vaccination-by-request-list.component';
import { VaccinationByRequestCreateComponent } from './vaccination-by-request-create/vaccination-by-request-create.component';
import {VaccinationByRequestRoutingModule} from './vaccination-by-request-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SuggestionComponent } from './suggestion/suggestion.component';



@NgModule({
  declarations: [VaccinationByRequestListComponent, VaccinationByRequestCreateComponent, SuggestionComponent],
    imports: [
        CommonModule,
        VaccinationByRequestRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class VaccinationByRequestModule { }
