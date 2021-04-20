import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IVaccinationHistoryFeedbackDTO} from '../dto/IVaccinationHistoryFeedbackDTO';
import {IVaccinationHistorySendFeedbackDTO} from "../dto/IVaccinationHistorySendFeedbackDTO";
import {IVaccinationHistoryRegisteredDTO} from "../dto/IVaccinationHistoryRegisteredDTO";


@Injectable({
  providedIn: 'root'
})
export class VaccinationHistoryService {
  private url = "http://localhost:8080/api/public";
  private header: any;
  constructor(private http: HttpClient) {
    this.header = new Headers( {'Content-Type' : 'application/context'})
  }

  private baseURL = 'http://localhost:8080/api/public';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  /**
   * TuNH
   */
  findByIdVaccinationHistory(vaccinationHistoryId): Observable<IVaccinationHistoryFeedbackDTO> {
    return this.http.get<IVaccinationHistoryFeedbackDTO>(this.baseURL + '/vaccination-history/feedback/' + vaccinationHistoryId, this.httpOptions);
  }
  /**
   * TuNH
   */
  findByAfterStatus(vaccinationHistoryId): Observable<IVaccinationHistorySendFeedbackDTO> {
    return this.http.get<IVaccinationHistorySendFeedbackDTO>(this.baseURL + '/vaccination-history/feedback/getAfterStatus/' + vaccinationHistoryId, this.httpOptions);

  }
  /**
   * TuNH
   */
  updateFeedback(vaccinationHistoryId, vaccinationHistory): Observable<IVaccinationHistorySendFeedbackDTO> {
    return this.http.put<IVaccinationHistorySendFeedbackDTO>(this.baseURL + '/vaccination-history/feedback/sendFeedback/' + vaccinationHistoryId, vaccinationHistory, this.httpOptions);
  }
  /**
   * TuNH
   */
  findAllVaccinationHistory(page: number, vaccineName: string, vaccinationDate: string, patientId: string): Observable<any> {
    return this.http.get<any>(this.baseURL + '/vaccination-history/?page=' + page + '&vaccineName=' + vaccineName + '&vaccinationDate='+ vaccinationDate + "&patientId="+ patientId, this.httpOptions);
  }


  /** LuyenNT code
   * @param page
   * @param name
   * @param status
   */
  searchPeriodicVaccination(page: number, name: string, status: string) {
    return this.http.get<any>(this.url + '/periodic-vaccination/search?name='+ name + '&status='+status + '&page=' + page);
  }

  /** LuyenNT code
   * @param page
   * @param name
   */
  getListPeriodicVaccination(page: number) {
    return this.http.get<any>(this.url + '/periodic-vaccination/list?page=' + page);
  }

  /**
   * list : create by LongBP
   */
  getAllRegisteredRequired(page: number, id: number, name: string) {
    return this.http.get<any>(this.url + '/registered-for-vaccination/list?name='+ name + '&id=' + id + '&page=' + page);
  }

  /**
   * search and paging : create by LongBP
   */
  searchRegisteredRequired(page: number,id: number, name: string, status: string) {
    return this.http.get<any>(this.url + '/registered-for-vaccination/search?name='+ name + '&id='+id + '&status='+status + '&page=' + page);
  }

  /**
   * find by Id : create by LongBP
   */
  getByIdRegisteredRequired(id): Observable<IVaccinationHistoryRegisteredDTO[]> {
    return this.http.get<IVaccinationHistoryRegisteredDTO[]>(this.url + '/registered-for-vaccination/view/' + id)
  }

  /**
   * edit by Id : create by LongBP
   */
  editVaccinationHistory(preStatus, idNeedEdit): Observable<any> {
    return this.http.get(this.url + '/registered-for-vaccination/edit?id=' + idNeedEdit + '&preStatus=' +preStatus);
  }

  /**
   * TuNH
   */
  getPatientId(accountId): Observable<number> {
    return this.http.get<number>(this.baseURL + '/gePatientVaccinationHistoryId/' + accountId , this.httpOptions);
  }
  /**
   * TuNH
   * sendMailForAdmin
   */
  sendMailFeedbackForAdmin(value: string, accountEmail: string): Observable<any> {
    return this.http.post<any>(this.baseURL + '/sendMailFeedbackForAdmin?value='+ value + '&accountEmail=' + accountEmail, this.httpOptions);
  }


  getAllVaccinationByDate(value: any): Observable<any> {
    return this.http.get<any>(this.url + '/get-total-vaccination-in-date?date='+value);
  }
}
