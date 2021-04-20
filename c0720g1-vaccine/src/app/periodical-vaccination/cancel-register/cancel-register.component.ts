import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {PeriodicalVaccinationKhoaService} from "../../service/periodical-vaccination-khoa.service";

@Component({
  selector: 'app-cancel-register',
  templateUrl: './cancel-register.component.html',
  styleUrls: ['./cancel-register.component.scss']
})
export class CancelRegisterComponent implements OnInit {

  constructor(private route : ActivatedRoute,
              private periodicalservice : PeriodicalVaccinationKhoaService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let code = params['code'];
      this.periodicalservice.cancelRegister(code).subscribe(
        data => {})
    })
  }
}
