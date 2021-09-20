import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}/tickets/admin`;

@Injectable({
  providedIn: 'root'
})
export class AgentHttpService {

  constructor(private http: HttpClient) { }

  updateTicketStatus(status: string, id: number){
    const httpHeaders = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put<any>(`${API_URL}/${id}`,JSON.stringify(status), {
      headers: httpHeaders
    });
  }

  getTicket(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/tickets/${id}`);
  }
  
  getTickets(): Observable<any> {
    return this.http.get<any>(API_URL);
  }
}
