import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../service/patient.service";
import {IPatient} from "../../entity/IPatient";
import {TokenStorageService} from "../../service/token-storage.service";
import {ProfileService} from "../../service/profile.service";

@Component({
  selector: 'app-profile-personal',
  templateUrl: './profile-personal.component.html',
  styleUrls: ['./profile-personal.component.scss']
})
export class ProfilePersonalComponent implements OnInit {

  private email = 'teosake.1999@gmail.com';

  public patientList: IPatient[];

  constructor(private patientService: PatientService,
              private tokenStorageService: TokenStorageService,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getListPatient();
  }

  getAccountEmail() {
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.email = user.email;
      console.log(user);
    }
  }
  getListPatient() {
    this.getAccountEmail();
    this.profileService.getAllPatientByEmai(this.email).subscribe(data => {
      this.patientList = data;
      console.log(data);
    })
  }

}
