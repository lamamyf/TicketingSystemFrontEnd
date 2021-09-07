import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserManagentService {
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;
  constructor(private userManagementHttpService: UserManagentService) { 
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  changePassword(currentPassword: String, password: String): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.userManagementHttpService.changePassword(currentPassword, password).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
}
}
