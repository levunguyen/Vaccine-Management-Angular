import {Component, OnInit} from '@angular/core';
import {VaccineService} from "../../service/vaccine.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../service/patient.service";
import {checkDateOfBirth} from "../../validator/check-date-of-birth";
import {checkDateVaccination} from "../../validator/check-date-vaccination";
import {ShowMessage} from "../../common/show-message";
import {VaccinationHistoryService} from "../../service/vaccination-history.service";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-vaccination-by-request-create',
  templateUrl: './vaccination-by-request-create.component.html',
  styleUrls: ['./vaccination-by-request-create.component.scss']
})
export class VaccinationByRequestCreateComponent implements OnInit {

  public vaccineDTO: any;

  public vaccineId: number;

  public formRegister: FormGroup;

  public check = false;

  public checkLoad = false;

  public checkdate = false;

  public patient: any;

  public checkTime1 = false;
  public checkTime2 = false;
  public checkTime3 = false;
  public checkTime4 = false;

  public timeVaccination = '';
  isSubmitted: boolean;


  constructor(private vaccineService: VaccineService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private patientService: PatientService,
              private router: Router,
              private showMessage: ShowMessage,
              private vaccinationHistoryService: VaccinationHistoryService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getAccountEmail();
    this.getVaccine();

    this.formRegister = this.fb.group({
      dateVaccination: ['', [Validators.required, checkDateVaccination]],
      timeVaccination: ['', [Validators.required]],
      vaccineId: [this.vaccineId],
      patientId: [this.patient.patientId]
    });

  }

  getVaccine() {
    this.route.paramMap.subscribe(param => {
      this.vaccineId = Number(param.get('id'));

      this.vaccineService.getVaccineById(this.vaccineId).subscribe(data => {
        this.vaccineDTO = data;
      });
    });
  }

  submit() {

    if (this.formRegister.invalid) {
      this.check = true;
      this.showMessage.showMessageCreateError();
      return;
    }
    this.isSubmitted = true;
    this.patientService.registerVaccination(this.formRegister.value).subscribe(data => {
      this.router.navigateByUrl('/vaccination-by-request/list');
      this.showMessage.showMessageCreateSuccessfully();

    }, error => {
      this.showMessage.showMessageCreateError();
      this.isSubmitted = false;
    });
  }

  checkDate(value: any) {
    this.vaccinationHistoryService.getAllVaccinationByDate(value).subscribe(data => {
      this.timeVaccination = '';
      if (data !== null) {
        this.checkdate = data[0] >= 8;

        this.checkTime1 = data[1] >= 2;
        this.checkTime2 = data[2] >= 2;
        this.checkTime3 = data[3] >= 2;
        this.checkTime4 = data[4] >= 2;
      }

    })
  }

  getAccountEmail() {
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.patient = user.patient;
      this.checkLoad = true;
      console.log(user);
    }
  }

}
