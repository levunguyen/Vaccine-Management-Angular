import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfilePersonalComponent} from "./profile-personal/profile-personal.component";



const routes: Routes = [
  {path: 'profile', component: ProfilePersonalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

/**
 * PhuocTC
 **/

export class ProfileRoutingModule { }
