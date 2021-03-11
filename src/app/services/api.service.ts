import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT, DOMAIN_NAME } from '../providers/providers';
import {AuthService, UserModel} from '../modules/auth';
import {catchError, retry} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {ResultsResponse} from '../pages/devices/results/results.component';


/**
 * Api is a generic REST Api handler. Set your API url first.
 */

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = API_ENDPOINT;
  domain: string = DOMAIN_NAME;
  isLoadingSubject: BehaviorSubject<boolean>;
  changePassSubject: BehaviorSubject<any>;

  constructor(public http: HttpClient, private authService: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.changePassSubject = new BehaviorSubject<any>(false);

  }


  getAllUsers(){
    return this.http.get(this.url + 'admin/' + 'getAllNotDeletedUsers');
  }
  getAllResults(){
    return this.http.get(this.url + 'dash/' + 'getAllResults');
  }

  getPageableResults(pageNumber): Observable<ResultsResponse> {

    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());

    return this.http.get<ResultsResponse>(this.url + 'dash/' + `getAllResults`, { params })
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
  }
  getResultsByUser(pageNumber, id): Observable<ResultsResponse> {

    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('createdBy', id.toString());

    return this.http.get<ResultsResponse>(this.url + 'dash/' + `getResultsByUser`, { params })
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
  }

  getAllPaths(){
    return this.http.get(this.url + 'dash/' + 'getAllPaths');
  }
  getDashboardData(){
    return this.http.get(this.url + 'dash/' + 'getDashboardData');
  }
  deleteUser(body: any){
    return this.http.post(this.url + 'admin/' + 'deleteUser', body);
  }
  addUser(body: any){
    return this.http.post(this.url + 'admin/' + 'createUser', body);
  }
  changePassword(body: any){
     return this.http.post<any>(this.url + 'admin/' + 'changePassword', body);
  }
  updatePaths(body: any){
     return this.http.post<any>(this.url + 'dash/' + 'updatePaths', body);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
        'Something bad happened; please try again later.');
  }

}
