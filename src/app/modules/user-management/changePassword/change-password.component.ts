import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService, ConfirmPasswordValidator, UserModel } from '../../auth';
import {  Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserManagentService } from '../services/user-managent.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
    formGroup: FormGroup;
    firstUserState: UserModel;
    subscriptions: Subscription[] = [];
    isLoading$: Observable<boolean>;
    hide = true;
    hasError: boolean;
    previousUrl: string;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private userManagentService: UserManagentService,
        private router: Router,
        private snackBar: MatSnackBar,
        private cdr: ChangeDetectorRef,
    ) {
        this.isLoading$ = this.userManagentService.isLoadingSubject.asObservable();
    }


    ngOnInit(): void {
        this.hasError = true;
        this.loadForm();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }

    loadForm() {
        this.hasError = false;
        this.formGroup = this.fb.group({
            currentPassword: ['', Validators.required],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{3,}')
            ])],
            confirmPassword: ['', Validators.required]
        }, {
            validator: ConfirmPasswordValidator.MatchPassword
        });
    }

    save() {
        const saveSubscr = this.userManagentService
            .changePassword(this.formGroup.controls.currentPassword.value, this.formGroup.controls.password.value).subscribe(result => {
                if (result.success) {
                    this.router.navigate(['/']).then(r =>
                        this.snackBar.open('تم تغيير كلمة المرور بنجاح', '', {
                            duration: 2000
                        })
                    );
                } else {
                    this.hasError = !result.success;
                    this.cdr.markForCheck();
                }
            });
        this.subscriptions.push(saveSubscr);
    }

    cancel() {
        const url = this.authService.currentAuthValue.userRole === "ADMIN" ? 'pages/agent' : 'pages/client';
        this.router.navigate([url]);
    }

}


