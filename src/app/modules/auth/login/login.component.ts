import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  defaultAuth: any = {
    email: '',
    password: '',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  isWrong: boolean;
  errorMessage: any;


  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    this.isWrong = false;
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.errorMessage = '';
    this.isWrong = false;
    this.hasError = false;

    const loginSubscr = this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {
        if (data === undefined) {
          this.hasError = true;
        } else if (typeof (data) === 'string') {
          this.errorMessage = data;
          this.isWrong = true;
        }
        else {
          this.returnUrl = this.authService.currentAuthValue.userRole === "ADMIN" ? 'pages/agent' : 'pages/client';
          this.router.navigate([this.returnUrl]);
        }



      });
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
