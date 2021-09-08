import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { LogoutComponent } from '../../auth/logout/logout.component';
import { first } from 'rxjs/operators';
import { Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { JwtInterceptor } from 'src/app/services/jwt.interceptor';
import { NbAuthJWTInterceptor } from '@nebular/auth';


@Component({
    selector: 'app-confirmdialog',
    templateUrl: './confirmation-dialog.html',
    styleUrls: ['./confirmation-dialog.scss'],

})

export class ConfirmationDialogComponent implements OnDestroy {
    private unsubscribe: Subscription[] = []; 

    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent> ,private authService: AuthService, private router: Router) {


    }

     logout(){
        const logoutSubscr = this.authService
        .logout()
        .pipe(first())
        .subscribe(()=>{
            console.log("jjjjj");
            this.router.navigate(['/auth/login']);         
            console.log("rrrrrr");


        });
    
        this.unsubscribe.push(logoutSubscr);

    }



    ngOnDestroy(): void {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
      }


    public confirmMessage: string;
}
