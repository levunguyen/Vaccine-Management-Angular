import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IVaccination} from '../entity/IVaccination';
import {catchError} from 'rxjs/operators';
import {ILocation} from '../entity/ILocation';
import {IVaccine} from '../entity/IVaccine';

@Injectable({
  providedIn: 'root'
})
export class VaccinationManagerService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  private apiVaccinationManagerUrl = 'http://localhost:8080/api/public/vaccination-manager';
  private apiLocationUrl = 'http://localhost:8080/api/public/vaccination-manager/locations';
  private apiVaccineUrl = 'http://localhost:8080/api/public/vaccination-manager/vaccines';

  constructor(private httpClient: HttpClient) {
  }

  getAllVaccination(page: number, type: number): Observable<any> {
    return this.httpClient.get<any>(this.apiVaccinationManagerUrl + '/list?page=' + page + '&type=' + type)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  searchDateAndNameOrStatus(startDate: any, endDate: any, name: any, status: any, pageable, type): Observable<any> {
    return this.httpClient.get<any>(this.apiVaccinationManagerUrl + '/search?startDate=' + startDate + '&endDate=' + endDate
      + '&name=' + name + '&status=' + status + '&pageable=' + pageable + '&type=' + type)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAllLocation(): Observable<ILocation[]> {
    return this.httpClient.get<ILocation[]>(this.apiLocationUrl + '/')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAllVaccine(): Observable<IVaccine[]> {
    return this.httpClient.get<IVaccine[]>(this.apiVaccineUrl + '/')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  findByIdVaccination(idVaccinationManager): Observable<IVaccination> {
    return this.httpClient.get<IVaccination>(this.apiVaccinationManagerUrl + '/findById/' + idVaccinationManager)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createVaccinationManager(vaccinationManager): Observable<IVaccination> {
    return this.httpClient.post<IVaccination>(this.apiVaccinationManagerUrl + '/create', vaccinationManager)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateVaccinationManagerStatus(idVaccinationManager) {
    return this.httpClient.patch<IVaccination>(this.apiVaccinationManagerUrl + '/status/' + idVaccinationManager, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateVaccinationManager(idVaccinationManager, vaccinationManager): Observable<IVaccination> {
    return this.httpClient.put<IVaccination>(this.apiVaccinationManagerUrl + '/update/' + idVaccinationManager, vaccinationManager)
      .pipe(
        catchError(this.errorHandler)
      );
  }


  deleteVaccinationManager(idVaccinationManager) {
    return this.httpClient.patch<IVaccination>(this.apiVaccinationManagerUrl + '/delete/' + idVaccinationManager, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
