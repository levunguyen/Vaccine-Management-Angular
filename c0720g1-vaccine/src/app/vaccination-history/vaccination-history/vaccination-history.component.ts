import {Component, OnInit} from '@angular/core';
import {VaccinationHistoryService} from "../../service/vaccination-history.service";
import {IVaccinationHistory} from "../../entity/IVaccinationHistory";
import {TokenStorageService} from "../../service/token-storage.service";
import {ProfileService} from "../../service/profile.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-vaccination-history',
  templateUrl: './vaccination-history.component.html',
  styleUrls: ['./vaccination-history.component.scss']
})

export class VaccinationHistoryComponent implements OnInit {
  vaccinationHistoryList: IVaccinationHistory[];
  page = 0;
  pageable: any;
  vaccineName = '';
  vaccinationDate = '';
  flag = false;

  error : string;

  patientId: string;

  constructor(
    public vaccinationHistoryService: VaccinationHistoryService,
    public tokenStorageService: TokenStorageService,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getListVaccine();
  }

  getListVaccine() {
    this.route.paramMap.subscribe(param => {
      this.patientId = param.get('patientId');
      this.vaccinationHistoryService.findAllVaccinationHistory(this.page, this.vaccineName, this.vaccinationDate, this.patientId).subscribe(data => {
        this.vaccinationHistoryList = data.content;
        this.pageable = data;
        this.flag = true;
      }, error => {
        this.error = 'Chưa có lịch sử tiêm';
      })
    })
  }


  resetSearch() {
    this.vaccineName = '';
    this.vaccinationDate = '';
    this.ngOnInit();
  }
}
