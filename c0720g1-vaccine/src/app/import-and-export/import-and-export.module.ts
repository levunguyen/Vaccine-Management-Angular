import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportAndExportComponent } from './import-and-export/import-and-export.component';
import {ImportAndExportRoutingModule} from './import-and-export-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  declarations: [ImportAndExportComponent],
  imports: [
    CommonModule,
    ImportAndExportRoutingModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
  ]
})
export class ImportAndExportModule { }
