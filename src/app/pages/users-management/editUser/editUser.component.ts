import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {AuthService, ConfirmPasswordValidator, UserModel} from '../../../modules/auth';
import {ApiService} from '../../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {RouterExtService} from '../../../services/RouterExtService.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edituser',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  userID: number;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  hide = true;
  hasError: boolean;
  previousUrl: string;
  isActive;
  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  constructor(private userService: AuthService,
              private fb: FormBuilder,
              private apiService: ApiService,
              private router: Router,
              private snackBar: MatSnackBar,
              private cdr: ChangeDetectorRef,
              private location: Location,
              private routerExtService: RouterExtService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
             
  ) {
      this.isLoading$ = this.userService.isLoadingSubject.asObservable();
      this.activatedRoute.queryParams.subscribe(params => {
          this.userID = params.user;
          this.isActive = params.isActive;
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3), ])],
      gender:['', Validators.required],

     
      }, );
  }

  save() {
      const saveSubscr = this.apiService
        .editUser(this.formGroup.value).subscribe(res => {
            if (!res.body) {
             this.router.navigate(['/dashboard']).then(r =>
                 this.snackBar.open('تم تعديل المستخدم بنجاح', '', {
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
  deleteUser(){

    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      width: '500px',
      height: '170px'
  });
  this.dialogRef.componentInstance.confirmMessage = 'هل أنت متآكد من حذف الحساب';
  this.dialogRef.afterClosed().subscribe(result => {

    this.dialogRef = null;
  });

  }

//   deleteUser(user: UserModel) {
//     this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
//         disableClose: false,
//         width: '500px',
//         height: '170px'
//     });
//     this.dialogRef.componentInstance.confirmMessage = 'هل آنت متآكد من حذف الحساب ' + user.firstName+" "+user.lastName + ' ؟';
//     this.dialogRef.afterClosed().subscribe(result => {
//         if (result) {
//             this.apiService
//                 .deleteUser(user.id).pipe()
//                 .subscribe((data: Response) => {
//                     const resStr = JSON.stringify(data);
//                     const resJSON = JSON.parse(resStr);
//                     if (resJSON.statusCodeValue === 200){
//                         this.loadUsers();
//                         this.snackBar.open('تم حذف المستخدم بنجاح', '', {
//                             duration: 2000,
//                         });
//                     }
//                 });
//         }
//         this.dialogRef = null;
//     });
// }

// getUser() : UserModel []  {

// let user: UserModel[] = [

//     {
//         id: 1,
//         firstName: "fawziah",
//         lastName: "alaqil",
//         password: "faerthnjj888",
//         email: "fawziah514@gmail.com",
//         avatar: "./assets/media/svg/avatars/default.jpg",
//         gender: "انثى",

//   }];
// return user}

}


