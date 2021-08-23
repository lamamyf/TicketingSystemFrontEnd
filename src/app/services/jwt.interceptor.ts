import { AuthService } from './../modules/auth/_services/auth.service';
import {HTTP_INTERCEPTORS, HttpEvent} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import {Observable} from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        const currentUser = this.authService.currentUserValue;
        const token = this.authService.currentToken;
        
        if (currentUser && token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'Accept-Language': `ar`,
                }
            });
        }

        return next.handle(request);
    }

}