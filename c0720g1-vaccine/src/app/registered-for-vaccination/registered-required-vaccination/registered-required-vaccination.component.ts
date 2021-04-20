/**
 * VaccinationHistoryRegistered : create by LongBP
 */

import { Component, OnInit } from '@angular/core';
import {IVaccinationHistory} from "../../entity/IVaccinationHistory";
import {VaccinationHistoryService} from "../../service/vaccination-history.service";

@Component({
  selector: 'app-registered-required-vaccination',
  templateUrl: './registered-required-vaccination.component.html',
  styleUrls: ['./registered-required-vaccination.component.scss']
})
export class RegisteredRequiredVaccinationComponent implements OnInit {

  public vaccinationHistoryList: IVaccinationHistory[];
  public name = '';
  public status = '';
  public page = 0;
  public pageable : any;
  constructor(private vaccinationHistoryService: VaccinationHistoryService ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.vaccinationHistoryService.getAllRegisteredRequired(this.page,2,this.name,).subscribe(data => {
      this.vaccinationHistoryList = data.content;
      this.pageable = data;
      console.log(data);
    }, error => console.log(error));
  }

  search(){
    this.vaccinationHistoryService.searchRegisteredRequired(this.page,2,this.name,this.status,).subscribe(data => {
      this.vaccinationHistoryList = data.content;
      this.pageable = data;
      console.log(data);
    }, error => {
      console.log(error);
      this.vaccinationHistoryList = [];
    });
  }
}
