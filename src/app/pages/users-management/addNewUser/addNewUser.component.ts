import {
  Component,
  OnInit,
  ElementRef
} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { LayoutService } from '../../../_metronic/core/';
import {AuthService} from '../../../modules/auth';
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
    formData;
    matcher = new MyErrorStateMatcher();

  constructor(private layout: LayoutService, private el: ElementRef,
              private authenticationService: AuthService,
              private apiService: ApiService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
      this.formData = new FormGroup({
          username: new FormControl('', Validators.compose([
              Validators.required])),
          roles: new FormControl('ADMIN', Validators.compose([
              Validators.required])),
          password: new FormControl('', Validators.compose([
              Validators.required])),
          confirmPassword: new FormControl(''),
          active: new FormControl(true)
      }, { validators: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
        const password = group.get('password').value;
        console.log(password);
        if(password!==""){
            console.log("password");

            const confirmPassword = group.get('confirmPassword').value;
        return password === confirmPassword ? null : { notSame: true };}
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
    isErrorState(control: FormControl | null): boolean {
        console.log(control);
        const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
        const invalidParent = (control?.parent?.invalid && control?.parent?.dirty);
        console.log(invalidCtrl);
        console.log(invalidParent);

        return invalidCtrl || invalidParent;
    }
}
