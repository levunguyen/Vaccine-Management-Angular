/**
 * VaccinationHistoryRegistered : create by LongBP
 */

import { Component, OnInit } from '@angular/core';
import {IVaccinationHistoryRegisteredDTO} from "../../dto/IVaccinationHistoryRegisteredDTO";
import {VaccinationHistoryService} from "../../service/vaccination-history.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AlertService} from "../../employee/alert.service";

@Component({
  selector: 'app-view-registered-required-vaccination',
  templateUrl: './view-registered-required-vaccination.component.html',
  styleUrls: ['./view-registered-required-vaccination.component.scss']
})
export class ViewRegisteredRequiredVaccinationComponent implements OnInit {

  public infoPatient: IVaccinationHistoryRegisteredDTO[];
  public preStatus = '';
  public status = true;

  public vaccinationHistoryRegisteredDTOS: IVaccinationHistoryRegisteredDTO;

  constructor(private vaccinationHistoryService : VaccinationHistoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.vaccinationHistoryService.getByIdRegisteredRequired(paramMap.get('id')).subscribe((data: IVaccinationHistoryRegisteredDTO[]) => {
        this.infoPatient = data;
        console.log(data);
        for (let e of data) {
          if (e.vaccinationHistoryId == Number(paramMap.get('idHistory'))) {
            this.vaccinationHistoryRegisteredDTOS = e;
          }
        }
      });
    });
  }

  editVaccinationHistory(){
    this.vaccinationHistoryService.editVaccinationHistory(this.preStatus,this.vaccinationHistoryRegisteredDTOS.vaccinationHistoryId).subscribe(data => {
      this.vaccinationHistoryRegisteredDTOS = data;
      console.log(data);
      this.router.navigateByUrl('/registered-required-vaccination').then(r => this.alertService.showAlertSuccess('Xác nhận sẽ tiêm cho bệnh nhân thành công!'));
    }, error => {
      console.log(error);
    });
  }
}
