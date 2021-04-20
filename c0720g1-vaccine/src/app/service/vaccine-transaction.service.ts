import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VaccineTransactionService {
  public API = 'http://localhost:8080/api/public/';
  API_SEARCH = 'http://localhost:8080/api/public/vaccine-transaction-search';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(
    public http: HttpClient
  ) {
  }

  getListTransaction(page: number): Observable<any> {
    return this.http.get(this.API + 'vaccine-transaction-list?page=' + page);
  }

  createTransaction(idVaccineHistory, price, quantity): Observable<any> {
    return this.http.post(this.API + 'vaccine-transaction-create?idVaccineHistory=' + idVaccineHistory + '&price=' + price + '&quantity=' + quantity, this.httpOptions)
  }

  getListVaccineHistory() {
    return this.http.get<any>(this.API + 'vaccination-history-list')
  }

  getNamePatient(id) {
    return this.http.get<any>(this.API + 'vaccine-history-patient/' + id)
  }

  getVaccineTransaction(id) {
    return this.http.get<any>(this.API + 'get-vaccine-transaction-id/' + id)
  }

  search(searchCriteria: { keyword2: string; keyword3: string }) {
    return this.http.post<any>(this.API_SEARCH, searchCriteria)
  }

  editTransaction(id, price, quantity) {
    return this.http.post<any>(this.API + 'vaccine-transaction-edit-by-id?id=' + id + '&price=' + price + '&quantity=' + quantity, this.httpOptions)

  }

  deleteById(id: number) {
    return this.http.delete<any>(this.API + 'vaccine-transaction-delete/' + id)
  }
}
