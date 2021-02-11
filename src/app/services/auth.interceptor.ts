import {HTTP_INTERCEPTORS, HttpEvent} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { AuthService } from '../modules/auth/_services/auth.service';
import {Observable} from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const a = this.injector.get(AuthService);
        const currentUser = a.currentUserValue;
        const tok = a.currentToken;
        if (currentUser && currentUser.username) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${tok}`,
                    'Accept-Language': `ar`,
                }
            });
        }

        return next.handle(request);
    }

}