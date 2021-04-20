import { Component, OnInit } from '@angular/core';
import {VaccineService} from "../../service/vaccine.service";
import {IVaccine} from "../../entity/IVaccine";
import {ShowMessage} from "../../common/show-message";

@Component({
  selector: 'app-vaccination-by-request-list',
  templateUrl: './vaccination-by-request-list.component.html',
  styleUrls: ['./vaccination-by-request-list.component.scss']
})
export class VaccinationByRequestListComponent implements OnInit {

  public vaccineList: IVaccine[];

  public name = '';

  public vaccineTypename = '';

  public origin = '';

  public page = 0;

  public pageable: any;

  public status = "";

  constructor(private vaccineService: VaccineService,
              private showMessage: ShowMessage) {}

  ngOnInit(): void {
    this.getListVaccine();
  }


  getListVaccine() {

    if (!Number(this.page) || Number(this.page) < 0) {
      this.page = 0;
    }


    this.vaccineService.getListVaccine(this.page,this.name.trim(),this.vaccineTypename.trim(),this.origin.trim(), this.status).subscribe(data => {
      console.log(data.length);
      this.vaccineList = data.content;
      this.pageable = data;
      console.log(data);
    }, error => {
      this.showMessage.showMessageNotFound();
      this.vaccineList = [];
    });
  }

  resetSearch() {
    this.name = '';
    this.page = 0;
    this.vaccineTypename = '';
    this.origin = '';
    this.status = '';

    this.getListVaccine();
  }
}
