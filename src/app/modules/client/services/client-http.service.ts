import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth';

const API_URL = `${environment.apiUrl}/tickets/client`;

@Injectable({
  providedIn: 'root'
})
export class ClientHttpService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  addTicket(body: any): Observable<any> {
    return this.http.post<any>(API_URL,
      {
        "userId": this.authService.currentAuthValue.id,
        "subject": body.subject,
        "description": body.description,
        "category": body.category
      });
  }
}
