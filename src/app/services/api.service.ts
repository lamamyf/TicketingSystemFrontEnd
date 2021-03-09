import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT, DOMAIN_NAME } from '../providers/providers';
import {AuthService, UserModel} from '../modules/auth';
import {catchError, finalize, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';


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

  protectedGet(endpoint: string, token: any, params?: any){
    return this.http.get(this.url + endpoint, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    });
  }

  getAllUsers(){
    return this.http.get(this.url + 'admin/' + 'getAllNotDeletedUsers');
  }
  getAllResults(){
    return this.http.get(this.url + 'dash/' + 'getAllResults');
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

  protectedPost(endpoint: string, body: any, token: any){
    return this.http.post(this.url + endpoint, body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    });
  }

  protectedPatch(endpoint: string, body: any, token: any){
    return this.http.patch(this.url + endpoint, body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    });
  }

  protectedPut(endpoint: string, body: any, token: any){
    return this.http.put(this.url + endpoint, body, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    });
  }

  protectedDelete(endpoint: string, token: any, params?: any, ){
    return this.http.delete(this.url + endpoint, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    });
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    return this.http.get(this.url + endpoint);
  }

  getPublic(endpoint: string) {
    return this.http.get(this.domain + endpoint, {responseType: 'text'});
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + endpoint, body, reqOpts);
  }
}
