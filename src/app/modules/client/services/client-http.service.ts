import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}/tickets/client`;

@Injectable({
  providedIn: 'root'
})
export class ClientHttpService {

  constructor(private http: HttpClient) { }
}
