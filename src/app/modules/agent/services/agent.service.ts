import { AgentHttpService } from './agent-http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;
  
  constructor(private agentHttpService: AgentHttpService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }

updateTicketStatus(status: string, id: number){
  this.isLoadingSubject.next(true);
  return this.agentHttpService.updateTicketStatus(status, id).pipe(
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

   getTicket(id): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.agentHttpService.getTicket(id).pipe(
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
    return this.agentHttpService.getTickets().pipe(
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
