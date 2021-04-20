import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VaccinationHistoryRoutingModule} from './vaccination-history-routing.module';
import {VaccinationHistoryComponent} from './vaccination-history/vaccination-history.component';
import {VaccinationHistoryFeedbackComponent} from './vaccination-history-feedback/vaccination-history-feedback.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [VaccinationHistoryComponent, VaccinationHistoryFeedbackComponent],
    imports: [
        CommonModule,
        VaccinationHistoryRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
    ]
})
export class VaccinationHistoryModule {
}
