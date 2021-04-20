import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {PeriodicalVaccinationManagerCreateComponent} from './periodical-vaccination-manager-create/periodical-vaccination-manager-create.component';
import {PeriodicalVaccinationManagerEditComponent} from './periodical-vaccination-manager-edit/periodical-vaccination-manager-edit.component';
import {PeriodicalVaccinationManagerListComponent} from './periodical-vaccination-manager-list/periodical-vaccination-manager-list.component';
import {AuthGuard} from "../security/auth.guard";


const routes: Routes = [
  {path: 'periodical-vaccination-manager', redirectTo: 'periodical-vaccination-manager/list', pathMatch: 'full'},
  {path: 'periodical-vaccination-manager/list', component: PeriodicalVaccinationManagerListComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }},
  {path: 'periodical-vaccination-manager/create', component: PeriodicalVaccinationManagerCreateComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }},
  {path: 'periodical-vaccination-manager/:idVaccinationManager/edit', component: PeriodicalVaccinationManagerEditComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }},
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PeriodicalVaccinationManagerRoutingModule {
}

