import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../../../models/auth.model';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) { }

 
  login(email: string, password: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Accept-Language': `ar`,
    });
    return this.http.post<AuthModel>(`${environment.apiUrl}/login`,   { email, password },  {
      headers: httpHeaders,
    });
  } 


  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${API_URL}/register`, user);
  }

  //Change too update password
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_URL}/forgot-password`, {
      email,
    });
  }

    getUserByToken(token): Observable<UserModel> {
      console.log(token);
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${API_URL}/users/1`, {
      headers: httpHeaders,
    });
  }

  
  refreshToken(): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'isRefreshToken': `true`,
    });

    return this.http.get<AuthModel>(`${environment.apiUrl}/refreshToken`, {
      headers: httpHeaders,
    });
  } 
  
  logout(token): Observable<any>{
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${API_URL}/logout`, {
      headers: httpHeaders,
    });
  }
}
