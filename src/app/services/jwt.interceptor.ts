import { AuthService } from 'src/app/modules/auth';
import { HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private jwtSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    
    constructor(private injector: Injector) { 

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authService.currentAuthValue;
        const token = this.authService.currentToken;

        if (currentUser && token) {
            request = this.setAuthorizationHeader(request, token);
        }

        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401 && JSON.stringify(error.error.subcode) === "420") {
                return this.refreshJwt(request, next);
            }
            return throwError(error);
        }));
    }

    private setAuthorizationHeader(request: HttpRequest<any>, token: String) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`,
                'Accept-Language': `ar`,
            }
        });
    }

    private refreshJwt(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.jwtSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.jwtSubject.next(token.jwt);
                    return next.handle(this.setAuthorizationHeader(request, token.jwt));
                }));

        } else {
            return this.jwtSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.setAuthorizationHeader(request, jwt));
                }));
        }
    }

    get authService(){
        return this.injector.get(AuthService);
    }

}