import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize, tap } from 'rxjs/operators';
import { UserModel } from '../../../models/user.model';
import { AuthModel } from '../../../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { } from '../../../services/api.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {

  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;


  currentUser$: Observable<UserModel>;
  currentAuth$: Observable<AuthModel>;
  isLoading$: Observable<boolean>;

  currentUserSubject: BehaviorSubject<UserModel>;
  currentAuthSubject: BehaviorSubject<AuthModel>;
  isLoadingSubject: BehaviorSubject<boolean>;

  errorMessage: any;

  get currentToken(): String {
    return this.getAuthFromLocalStorage();
  }

  get currentUserValue(): UserModel {
    console.log(this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }


  get currentAuthValue(): AuthModel {
    return this.currentAuthSubject.value;
  }

  set currentAuthValue(auth: AuthModel) {
    this.currentAuthSubject.next(auth);
  }

  constructor(
    private authHttpService: AuthHTTPService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    
    var token = this.getAuthFromLocalStorage();
    this.currentAuthSubject = token ? new BehaviorSubject<AuthModel>(new AuthModel(token)) : new BehaviorSubject<AuthModel>(undefined);

    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.currentAuth$ = this.currentAuthSubject.asObservable();

    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }


  login(email: string, password: string): Observable<any> {
    this.isLoadingSubject.next(true);

    return this.authHttpService.login(email, password).pipe(
      map((auth: AuthModel) => {
        if (auth.jwt !== undefined) {
          const newAuth = new AuthModel(auth);
          this.currentAuthSubject.next(newAuth);

          const result = this.setAuthFromLocalStorage(newAuth);

          this.errorMessage = null;
          return result;
        }

        this.errorMessage = auth;
        return false;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err.error);
        return of(err.error.response);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  logout(): Observable<any> {
    this.isLoadingSubject.next(true);
    //*might not nedd to send token as param*
    return this.authHttpService.logout(this.currentToken)
      .pipe(
        tap(() => this.clean()),
        catchError(error => {
          console.log(error.error);
          return of(false);
        }),
        finalize(() =>
          this.isLoadingSubject.next(false)
        ));
  }

  getUserByToken(): Observable<any> {
    const auth = this.getAuthFromLocalStorage();

    if (auth == null && this.errorMessage == null) {
      return of(undefined);
    }

    if (this.errorMessage != null) {
      return of(this.errorMessage);
    }

    this.isLoadingSubject.next(true);

    return this.authHttpService.getUserByToken(auth, this.currentAuthValue.id).pipe(
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

  refreshToken(): Observable<any> {
    this.isLoadingSubject.next(true);

    return this.authHttpService.refreshToken().pipe(
      tap((auth: AuthModel) => {
        const newAuth = new AuthModel(auth);
        this.currentAuthSubject.next(newAuth);

        this.setAuthFromLocalStorage(newAuth);
      }
      ),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  private clean() {
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentAuthSubject = new BehaviorSubject<AuthModel>(undefined);

    localStorage.removeItem(this.authLocalStorageToken);
  }
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    localStorage.setItem(this.authLocalStorageToken, auth.jwt);
    return true;
  }

  private getAuthFromLocalStorage(): String {
    try {

      return localStorage.getItem(this.authLocalStorageToken)

    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
