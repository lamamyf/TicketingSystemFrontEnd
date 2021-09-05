import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
  providedIn: 'root'
})
export class ProtectedResourceGuard implements CanActivate, OnDestroy {
  private unsubscribe: Subscription[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentAuthValue;

    if (currentUser) {
      return true;
    }

    const logoutSubscr = this.authService.logout()
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['/auth/login']);
      });

    this.unsubscribe.push(logoutSubscr);
    return false;
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
