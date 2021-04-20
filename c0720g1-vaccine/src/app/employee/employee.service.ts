import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEmployeeDTO} from "../entity/IEmployeeDTO";
import {IEmployeeRoleDTO} from "../entity/IEmployeeRoleDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  /*
  * HungDH - Hien thi, sua, xoa Employee
   */
  private API_EMPLOYEE = 'http://localhost:8080/api/public';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'}
  constructor(
    private http: HttpClient
  ) {}
/*
* HungDH - hien thi danh sach nhan vien
 */
  getAllEmployee(): Observable<IEmployeeDTO[]>{
    return this.http.get<IEmployeeDTO[]>(this.API_EMPLOYEE + '/list-employee');
  }
  /*
* HungDH - tim kiem theo id, ten, chuc vu nhan vien
 */
  searchEmployeeByName(name: string, idEmpSearch: string, positionSearch: string): Observable<any> {
    console.log(name + ' xyz ' + idEmpSearch + ' xyz ' + positionSearch);
    return this.http.get<any>(this.API_EMPLOYEE + '/list-employee?nameSearch=' + name + '&idEmpSearch=' +
      idEmpSearch + '&positionSearch=' + positionSearch);
  }
  /*
* HungDH - chinh súa thong tin nhan vien
 */
  editEmployee(employee): Observable<IEmployeeRoleDTO>{
    return this.http.put<IEmployeeRoleDTO>(this.API_EMPLOYEE + '/edit-employee/' , employee);
  }
  /*
* HungDH - tim kien thong tin theo id
 */
  findById(id): Observable<IEmployeeRoleDTO> {
    return this.http.get<IEmployeeRoleDTO>(this.API_EMPLOYEE + '/find-id/'+ id, this.httpOptions);
  }
  /*
* HungDH - xoa nhan vien
 */
  deleteEmployee(id: number): Observable<any>{
    return this.http.patch<any>(this.API_EMPLOYEE + '/delete-employee/' + id, this.httpOptions);
  }
}
