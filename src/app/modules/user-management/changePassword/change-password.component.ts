import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {AuthService, ConfirmPasswordValidator, UserModel} from '../../auth';
import {ApiService} from '../../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {RouterExtService} from '../../../services/RouterExtService.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  userID: number;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  hide = true;
  hasError: boolean;
  previousUrl: string;

  constructor(private userService: AuthService,
              private fb: FormBuilder,
              private apiService: ApiService,
              private router: Router,
              private snackBar: MatSnackBar,
              private cdr: ChangeDetectorRef,
              private location: Location,
              private routerExtService: RouterExtService,
              private activatedRoute: ActivatedRoute
  ) {
      this.isLoading$ = this.userService.isLoadingSubject.asObservable();
      this.activatedRoute.queryParams.subscribe(params => {
          this.userID = params['user'];
      });
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
      id: [this.userID],
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

  cancel(){
      this.previousUrl = this.routerExtService.getPreviousUrl();
      if (this.previousUrl !== '/usersManagement'){
          this.router.navigate(['/pages/dashboard']);
      }
      else {
          this.location.back();
      }

  }

}


