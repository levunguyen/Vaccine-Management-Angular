import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  private url = "http://localhost:8080/api/public";

  private header: any;

  constructor(private http: HttpClient) {
    this.header = new Headers( {'Content-Type' : 'application/context'})
  }


  getListVaccine(page: number, name: string, vaccineTypeName: string, origin: string, status: string): Observable<any> {
    return this.http.get<any>(this.url + '/vaccine/list?page='+ page + '&name='+name + '&vaccineTypeName=' + vaccineTypeName + '&origin=' + origin + '&status=' + status );
  }

  getVaccineById(vaccineId: number): Observable<any> {
    return this.http.get<any>(this.url + '/vaccination/get-vaccine/' + vaccineId);
  }

  getAllVaccine(): Observable<any> {
    return this.http.get<any>(this.url + '/get-list-vaccine')
  }
}
