import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileRoutingModule} from "./profile-routing.module";
import { ProfilePersonalComponent } from './profile-personal/profile-personal.component';



@NgModule({
  declarations: [ProfilePersonalComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
