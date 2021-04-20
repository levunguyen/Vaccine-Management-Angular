import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  isSuccessful = false;
  isSendMail =false;
  constructor(private route:ActivatedRoute,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let code = params['code'];
    if(code == null){
      this.isSendMail=false;
    }else {
      this.isSendMail=true;
      this.authService.verify(code).subscribe(
        data => {
          console.log(data.message);
          this.isSuccessful = (data.message === 'activated');
        },
        err => {
          this.isSuccessful = false;
        }
      );
    }
      console.log(code); // Print the parameter to the console.
    });
  }

}
