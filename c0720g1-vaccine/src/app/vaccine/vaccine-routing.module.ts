import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {VaccineListComponent} from "./vaccine-list/vaccine-list.component";
import {VaccineCreateComponent} from "./vaccine-create/vaccine-create.component";
import {ImportAndExportModule} from "../import-and-export/import-and-export.module";
import {AuthGuard} from "../security/auth.guard";


const routes:Routes=[
  {path:'vaccine-list',component: VaccineListComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }},
  {path:'vaccine-create',component: VaccineCreateComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ImportAndExportModule
  ]
})
export class VaccineRoutingModule { }
