import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';;
import { Subscription } from 'rxjs';



@Component({
    selector: 'app-confirmdialog',
    templateUrl: './confirmation-dialog.html',
    styleUrls: ['./confirmation-dialog.scss'],

})

export class ConfirmationDialogComponent implements OnDestroy {
    public confirmMessage: string;
    public doSomthing;
    private unsubscribe: Subscription[] = [];

    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, private authService: AuthService) {
    }

    ngOnDestroy(): void {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }


  
}
