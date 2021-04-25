import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import {EmployeeModule} from "./employee/employee.module";
import {VaccinationHistoryModule} from "./vaccination-history/vaccination-history.module";
import {PatientModule} from './patient/patient.module';
import {VaccineModule} from "./vaccine/vaccine.module";
import {SecurityModule} from "./security/security.module";
import {VaccinePriceManagementModule} from './vaccine-price-management/vaccine-price-management.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {VaccinationByRequestModule} from "./vaccination-by-request/vaccination-by-request.module";
import {HttpClientModule} from "@angular/common/http";
import {VaccineTransactionManagementModule} from "./vaccine-transaction-management/vaccine-transaction-management.module";
import {PeriodicalVaccinationModule} from "./periodical-vaccination/periodical-vaccination.module";
import {RegisteredForVaccinationModule} from "./registered-for-vaccination/registered-for-vaccination.module";
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {PeriodicalVaccinationManagerModule} from "./periodical-vaccination-manager/periodical-vaccination-manager.module";
import {ProfileModule} from "./profile/profile.module";
import {AngularFireModule} from '@angular/fire';
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    ReactiveFormsModule,
    EmployeeModule,
    BrowserModule,
    AppRoutingModule,
    VaccinationHistoryModule,
    VaccineModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PatientModule,
    VaccineModule,
    SecurityModule,
    VaccinePriceManagementModule,
    VaccinationByRequestModule,
    HttpClientModule,
    VaccineTransactionManagementModule,
    PeriodicalVaccinationManagerModule,
    PeriodicalVaccinationModule,
    RegisteredForVaccinationModule,
    FormsModule,
    ProfileModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
