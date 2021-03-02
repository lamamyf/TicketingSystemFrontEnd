import {
  Component,
  OnInit,
  ElementRef
} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { LayoutService } from '../../../_metronic/core/';
import {AuthService, ConfirmPasswordValidator} from '../../../modules/auth';
import {ApiService} from '../../../services/api.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './addNewUser.component.html',
  styleUrls: ['./addNewUser.component.scss'],
})
export class AddNewUserComponent implements OnInit {
    formGroup: FormGroup;
    hide = true;
    formData: FormGroup;
    matcher = new MyErrorStateMatcher();
    hasError: boolean;

  constructor(private layout: LayoutService, private el: ElementRef,
              private authenticationService: AuthService,
              private apiService: ApiService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
      this.formData = new FormGroup({
          username: new FormControl('', Validators.compose([
              Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')])),
          roles: new FormControl('', Validators.compose([
              Validators.required])),
          password: new FormControl('', Validators.compose([
              Validators.required,
              Validators.minLength(8),
              Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{3,}')
          ])),
          confirmPassword: new FormControl(''),
          active: new FormControl(true)
      }, { validators: ConfirmPasswordValidator.MatchPassword
      });
  }

  addUser(data: any) {
      this.apiService
          .addUser(data).pipe()
          .subscribe((res: Response) => {
              const resStr = JSON.stringify(res);
              const resJSON = JSON.parse(resStr);
              if (resJSON.statusCodeValue === 200){
                  this.router.navigate(['/usersManagement']).then(r =>
                      this.snackBar.open('تمت إضافة المستخدم بنجاح', '', {
                          duration: 2000,
                      })
                  );
              }
          });
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidParent = !!(
            control
            && control.parent
            && control.parent.invalid
            && control.parent.dirty
            && control.parent.hasError('notSame'));
        return (invalidParent);
    }
}
