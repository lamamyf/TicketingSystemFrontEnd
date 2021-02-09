import {
  Component,
  OnInit,
  ElementRef
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { LayoutService } from '../../../_metronic/core/';
import {AuthService} from '../../../modules/auth';
import {ApiService} from '../../../services/api.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-adduser',
  templateUrl: './addNewUser.component.html',
  styleUrls: ['./addNewUser.component.scss'],
})
export class AddNewUserComponent implements OnInit {
    formGroup: FormGroup;
    hide = true;
    formData;

  constructor(private layout: LayoutService, private el: ElementRef,
              private authenticationService: AuthService,
              private apiService: ApiService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
      this.formData = new FormGroup({
          username: new FormControl('', Validators.compose([
              Validators.required,])),
          roles: new FormControl('Admin', Validators.compose([
              Validators.required,])),
          password: new FormControl(''),
          active: new FormControl(true)
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
