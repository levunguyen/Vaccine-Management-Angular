import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPosition} from "../entity/IPosition";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  /*
 * HungDH
  */
  private baseURL = 'http://localhost:8080/api/public/position';
  constructor(
    private http: HttpClient
  ) {
  }
  findAll(): Observable<IPosition[]>{
    return this.http.get<IPosition[]>(this.baseURL);
  }
}
