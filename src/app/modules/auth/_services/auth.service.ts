import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http';
import {  } from '../../../services/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {

  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;


  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;
  errorMessage: any;

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }
  get currentToken(): String {
    return this.getAuthFromLocalStorage();
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }


  login(email: string, password: string): Observable<any> {
    this.isLoadingSubject.next(true);

    return this.authHttpService.login(email, password).pipe(
      map((auth: any) => {
        if (auth.jwt !== undefined){
          const result = this.setAuthFromLocalStorage(auth);
          this.errorMessage = null;
          return result;
        }
        this.errorMessage = auth;
        return false;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    this.authHttpService.logout(this.currentToken);
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login']);
  }

  getUserByToken(): Observable<any> {
    const auth = this.getAuthFromLocalStorage();

    if (auth == null && this.errorMessage == null) {
      return of(undefined);
    }
    
    if (this.errorMessage != null){
      return of(this.errorMessage);
    }

    this.isLoadingSubject.next(true);

    return this.authHttpService.getUserByToken(auth).pipe(
        map((user: UserModel) => {
          this.currentUserSubject = new BehaviorSubject<UserModel>(user);
          return user;
        }),
        finalize(() => this.isLoadingSubject.next(false))
    );
  }

  
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);

    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

    //Change to update password
    forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);

    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }


  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth.jwt));
    return true;
  }

  private getAuthFromLocalStorage(): String {
    try {
      return JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
