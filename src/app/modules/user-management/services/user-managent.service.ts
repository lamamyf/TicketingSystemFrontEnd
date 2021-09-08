import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { UserManagementHttpService } from './user-management-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagentService {
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private userManagementHttpService: UserManagementHttpService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  changePassword(currentPassword: string, password: string): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.userManagementHttpService.changePassword(currentPassword, password).pipe(
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

  editUser(body: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.userManagementHttpService.editUser(body).pipe(
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
