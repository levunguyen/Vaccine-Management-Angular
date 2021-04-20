import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListPatientComponent} from './list-patient/list-patient.component';
import {EditPatientComponent} from './edit-patient/edit-patient.component';
import {DeletePatientComponent} from './delete-patient/delete-patient.component';
import {PatientCreateComponent} from './patient-create/patient-create.component';
import {AuthGuard} from "../security/auth.guard";

const routes: Routes = [
  {path: 'patient', redirectTo: 'patient/list', pathMatch: 'full'},
  {
    path: 'patient/list', component: ListPatientComponent
    , canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'patient/create', component: PatientCreateComponent
    , canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'patient/edit', children: [
      {path: ':id', component: EditPatientComponent}
    ], canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'patient/list/delete', component: DeletePatientComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'register', component: PatientCreateComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PatientRoutingModule {
}
