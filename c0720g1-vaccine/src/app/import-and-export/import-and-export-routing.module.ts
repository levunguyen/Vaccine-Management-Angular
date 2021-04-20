import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImportAndExportComponent} from './import-and-export/import-and-export.component';
import {AuthGuard} from "../security/auth.guard";


const routes: Routes = [
  {path: 'import-and-export/:vaccineId', component: ImportAndExportComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportAndExportRoutingModule { }
