import { Injectable } from '@angular/core';
import {IRole} from "../entity/IRole";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  /*
  * HungDH
   */
  private baseURL = 'http://localhost:8080/api/public/role';
  constructor(
    private http: HttpClient
  ) {
  }
  findAll(): Observable<IRole[]>{
    return this.http.get<IRole[]>(this.baseURL);
  }
}
