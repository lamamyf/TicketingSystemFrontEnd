import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { first } from 'rxjs/operators';
import { Subscription} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnDestroy {
  private unsubscribe: Subscription[] = []; 

  constructor(private authService: AuthService, private router: Router) {
    this.logout();
  }

  private logout(){
    const logoutSubscr = this.authService
    .logout()
    .pipe(first())
    .subscribe(()=>{
      this.router.navigate(['/auth/login']);
    });

    this.unsubscribe.push(logoutSubscr);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
