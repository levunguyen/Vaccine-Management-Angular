import { Component, OnInit } from '@angular/core';
import { VaccineService } from 'src/app/service/vaccine.service';
import {IVaccine} from "../../entity/IVaccine";

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  vaccineList: IVaccine[];

  constructor(private vaccineService: VaccineService) { }

  ngOnInit(): void {
    this.getAllVaccine();
  }

  getAllVaccine() {
    this.vaccineService.getAllVaccine().subscribe(data => {
      this.vaccineList = data.content
    })
  }
}
