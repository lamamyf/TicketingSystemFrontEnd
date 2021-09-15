import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ClientHttpService } from './client-http.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;
  constructor(private clientHttpService: ClientHttpService) { 
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getTicket(id): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.clientHttpService.getTicket(id).pipe(
      catchError((err) => {
        console.log(err);
        console.error('err', err.error);
        return of(err.error);
      }),
      finalize(() => {
        this.isLoadingSubject.next(false);
      })
    );
  }

  getTickets(): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.clientHttpService.getTickets().pipe(
      catchError((err) => {
        console.log(err);
        console.error('err', err.error);
        return of(err.error);
      }),
      finalize(() => {
        this.isLoadingSubject.next(false);
      })
    );
  }

  addTicket(body: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.clientHttpService.addTicket(body).pipe(
      catchError((err) => {
        console.log(err);
        console.error('err', err.error);
        return of(err.error);
      }),
      finalize(() => {
        this.isLoadingSubject.next(false);
      })
    );
  }
}
