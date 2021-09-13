import { AuthService } from './../../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}/users`;
@Injectable({
  providedIn: 'root'
})
export class UserManagementHttpService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  changePassword(currentPassword: string, password: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/changePassword/${this.authService.currentAuthValue.id}`,
      {
        currentPassword, password
      });
  }

  editUser(body: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/${this.authService.currentAuthValue.id}`, body);
  }

  deleteUser(): Observable<any> {
    return this.http.delete<any>(`${API_URL}/${this.authService.currentAuthValue.id}`);
  }
}
