import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = "http://localhost:8080/api/public";

  constructor(private http: HttpClient) { }


  /**
   * Phuoc
   **/
  getAllPatientByEmai(email: string):Observable<any> {
    return this.http.get<any>(this.url + '/profile?email=' + email);
  }


  /**
   * Phuoc
   **/
  getListVaccinationHistoryByPatient(page: number, name: string, date: string, patientId: string):Observable<any> {
    return this.http.get<any>(this.url + '/profile-personal?name='+ name + '&date=' + date + '&patientId=' + patientId +'&page=' + page);
  }
}
