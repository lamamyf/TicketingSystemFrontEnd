import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {first} from 'rxjs/operators';
import {AuthService, ConfirmPasswordValidator, UserModel} from '../../../modules/auth';
import {ApiService} from '../../../services/api.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: UserModel;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  hide = true;
  hasError: boolean;

  constructor(private userService: AuthService,
              private fb: FormBuilder,
              private apiService: ApiService,
              private router: Router,
              private snackBar: MatSnackBar,
              private cdr: ChangeDetectorRef
  ) {
    this.isLoading$ = this.userService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.hasError = true;
    const sb = this.userService.currentUserSubject.asObservable().pipe(
      first(user => !!user)
    ).subscribe(user => {
      this.user = Object.assign({}, user);
      this.firstUserState = Object.assign({}, user);
      this.loadForm();
    });
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
      this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
      this.hasError = false;
      this.formGroup = this.fb.group({
      id: [this.user.id],
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
      const saveSubscr = this.apiService
        .changePassword(this.formGroup.value).subscribe(res => {
            if (!res.body) {
             this.router.navigate(['/']).then(r =>
                 this.snackBar.open('تم تغيير كلمة المرور بنجاح', '', {
                     duration: 2000
                 })
             );
            } else {
                this.hasError = res.body;
                this.cdr.markForCheck();
            }
        });
      this.subscriptions.push(saveSubscr);
  }

}


