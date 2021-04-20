import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {PeriodicalVaccinationKhoaService} from "../../service/periodical-vaccination-khoa.service";
import {IPeriodicalVaccinationDTO} from "../../entity/IPeriodicalVaccinationDTO";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShowMessage} from "../../common/show-message";
import {checkDateOfBirth} from "../../validator/check-date-of-birth";
import {IPatient} from "../../entity/IPatient";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-periodical-vaccination-register',
  templateUrl: './periodical-vaccination-register.component.html',
  styleUrls: ['./periodical-vaccination-register.component.scss']
})
export class PeriodicalVaccinationRegisterComponent implements OnInit {

  sub: Subscription;
  periodicalVaccination: IPeriodicalVaccinationDTO;
  patientForm: FormGroup;
  isSubmitted: boolean;
  currentPatient: any;
  timeListString: Array<string> = ['08:00:00 - 09:30:00', '09:30:00 - 11:00:00', '13:30:00 - 15:00:00', '15:00:00 - 16:30:00'];
  timeFrame: string;
  timeMessage: string;
  quantityMessage: string;
  validRegister: boolean = false;
  registerInfo: any;
  alreadyRegister: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private vaccinationService : PeriodicalVaccinationKhoaService,
              private router: Router,
              private showMessage: ShowMessage,
              public tokenStorageService: TokenStorageService) {
    this.patientForm = new FormGroup({
      time: new FormControl('', [Validators.required]),
      vaccinationId: new FormControl(),
      patientId: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getPatient();
    this.sub = this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.vaccinationService.getById(id).subscribe( (data: IPeriodicalVaccinationDTO) => {
        this.periodicalVaccination = data;
        this.periodicalVaccination.duration = (this.periodicalVaccination.duration == null) ? 0 : this.periodicalVaccination.duration;
        this.periodicalVaccination.times = (this.periodicalVaccination.times == null) ? 1 : this.periodicalVaccination.times;
      })
    },)
  }

  submitVaccinationRegister() {
    this.isSubmitted = true;
    this.patientForm.value.vaccinationId = this.periodicalVaccination.vaccinationId;
    console.log(this.patientForm.value);
    this.vaccinationService.saveRegister(this.patientForm.value).subscribe( (response) => {
      // this.isSubmited = true;
    },() => {
      this.showMessage.showMessageRegisterError();
    }, () => {
      this.showMessage.showMessageRegisterSuccessfully();
      this.router.navigateByUrl('')
    });
  }
  getPatient() {
    this.currentPatient =  this.tokenStorageService.getUser().patient;
    console.log(this.currentPatient);
  }
  selectTime(value: any) {
      this.patientForm.value.startTime = value.substring(0,8);
      this.patientForm.value.endTime = value.substring(11);
      this.patientForm.value.vaccinationId = this.periodicalVaccination.vaccinationId;
      this.patientForm.value.patientId = this.currentPatient.patientId;
      console.log(this.patientForm.value);
      this.vaccinationService.checkAvailableRegister(this.patientForm.value).subscribe( (data: any) => {
        console.log(data);
        this.timeMessage = (data.timeIsValid) ? "": "Khung giờ này đã đầy";
        this.quantityMessage = (data.quantityIsValid) ? "": "Loại vắc xin này đã được đăng ký tiêm hết, mong quý khách thông cảm";
        this.alreadyRegister = data.alreadyRegister;
        if(this.timeMessage == "" && this.quantityMessage == "" && !this.alreadyRegister){
          this.validRegister = true;
        }
      }, () => {}, () => {});
  }
}
