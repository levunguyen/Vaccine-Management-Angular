import {AfterViewInit, Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {LoginComponent} from "../../security/login/login.component";
import {AccountService} from "../../service/account.service";
import {ShareService} from "../../service/share.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
@Injectable({
  providedIn: 'root',
})

export class HeaderComponent implements OnInit {
  username: string;
  idPatient: number;
  currentUser: string;
  role: string;
  isLoggedIn: boolean = false;

  constructor(private tokenStorageService: TokenStorageService,
              private shareService : ShareService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    })
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
    this.getUsernameAccount();
  }


  ngOnInit(): void {
    this.loadHeader();
  }

  logOut() {
    this.tokenStorageService.signOut();
    this.ngOnInit();
  }

  getUsernameAccount(){
    if (this.tokenStorageService.getToken()) {
      this.idPatient = this.tokenStorageService.getUser().patient.patientId;
    }
  }

}
