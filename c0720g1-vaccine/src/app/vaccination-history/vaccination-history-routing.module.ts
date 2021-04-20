import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {VaccinationHistoryComponent} from "./vaccination-history/vaccination-history.component";
import {VaccinationHistoryFeedbackComponent} from "./vaccination-history-feedback/vaccination-history-feedback.component";
import {AuthGuard} from "../security/auth.guard";



const routes: Routes = [
  {
    path: 'vaccination-history/:patientId', component: VaccinationHistoryComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_USER','ROLE_ADMIN']
    }
  },
  {
    path: 'vaccination-history/feedback/:id', component: VaccinationHistoryFeedbackComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_USER','ROLE_ADMIN']
    }
  },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class VaccinationHistoryRoutingModule { }
