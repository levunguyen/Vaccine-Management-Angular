import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPeriodicalVaccinationDTO} from "../entity/IPeriodicalVaccinationDTO";
import {
  ISearchAndPage,
  TimeStamp
} from "../periodical-vaccination/periodical-vaccination-list/periodical-vaccination-list.component";

@Injectable({
  providedIn: 'root'
})
export class PeriodicalVaccinationKhoaService {
  private apiServer = 'http://localhost:8080/api/public/vaccination/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<IPeriodicalVaccinationDTO[]> {
    return this.httpClient.get<IPeriodicalVaccinationDTO[]>(this.apiServer + 'register-list');
  }

  getById(id: string) {
    return this.httpClient.get<IPeriodicalVaccinationDTO>(this.apiServer+ 'register-list/' + id);
  }

  saveRegister(value: any): Observable<void> {
    return this.httpClient.post<any>(this.apiServer+ 'register-patient', value)
  }

  getAgeList(): Observable<string[]>{
    return this.httpClient.get<string[]>(this.apiServer + 'age-list')
  }

  getTimeList(): Observable<TimeStamp[]> {
    return this.httpClient.get<TimeStamp[]>(this.apiServer + 'time-list')
  }

  findTotalPage(searchData: ISearchAndPage): Observable<number> {
    return  this.httpClient.post<number>(this.apiServer+'get-total-page', searchData)
  }

  findCustomVaccination(searchData: ISearchAndPage): Observable<IPeriodicalVaccinationDTO[]> {
    return  this.httpClient.post<IPeriodicalVaccinationDTO[]>(this.apiServer+'get-custom-list', searchData)
  }

  cancelRegister(code: string): Observable<any> {
    console.log(code);
    return this.httpClient.post(this.apiServer+'cancel', {code: code})
  }

  checkAvailableRegister(value: any): Observable<any> {
    console.log(value);
    return this.httpClient.post<any>(this.apiServer+ 'check-register', value)
  }

  checkPastVaccinationHistory(periodicalVaccination: IPeriodicalVaccinationDTO) {
    return this.httpClient.post<any>(this.apiServer+'check-history', periodicalVaccination)
  }
}
