import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccount} from "../entity/IAccount";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  /*
 * HungDH
  */
  private baseURL = 'http://localhost:8080/api/public/account';
  constructor(
    private http: HttpClient
  ) {
  }
  findAll(): Observable<IAccount[]>{
    return this.http.get<IAccount[]>(this.baseURL);
  }
}
