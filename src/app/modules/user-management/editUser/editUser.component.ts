import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService, UserModel } from '../../auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AvatarsDialogComponent } from '../../shared/avatars/avatarsDialog';
import { UserManagentService } from '../services/user-managent.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  hide = true;
  public static avatarId: number;
  hasError: boolean;
  previousUrl: string;
  dialogRefAvatar: MatDialogRef<AvatarsDialogComponent>;

  dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  constructor(
    private userManagentService: UserManagentService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,

  ) {
    this.isLoading$ = this.userManagentService.isLoadingSubject.asObservable();
    this.activatedRoute.queryParams.subscribe(params => {
      this.cdr = cdr;
      //change later
     
      EditUserComponent.avatarId = authService.currentUserValue.avatar;
    });
  }

  ngOnInit(): void {
    this.hasError = true;
    this.loadForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }



  editAvatar() {
    this.dialogRefAvatar = this.dialog.open(AvatarsDialogComponent, {
      disableClose: false,
      width: '650px',
      height: '600px'
    });
    this.dialogRefAvatar.afterClosed().subscribe(result => {
      this.dialogRefAvatar = null;

      this.cdr.detectChanges()

      //location.reload();
    });
  }


  loadForm() {
    this.hasError = false;
    this.formGroup = this.fb.group({
<<<<<<< Updated upstream
      firstName: [this.firstName, Validators.compose([
=======
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),])],
      lastName: ['', Validators.compose([
>>>>>>> Stashed changes
        Validators.required,
        Validators.minLength(3),])],
      lastName: [this.lastName, Validators.compose([
        Validators.required,
        Validators.minLength(3),])],
      gender: [this.gender, Validators.required],


    });
  }

  

  save() {
    const saveSubscr = this.userManagentService
      .editUser(this.formGroup.value).subscribe(response => {
        console.log(response);
        if (response.success) {
          this.router.navigate([this.url]).then(r =>
            this.snackBar.open('تم تعديل المستخدم بنجاح', '', {
              duration: 2000
            })
          );
        } else {
          this.hasError = !response.success;
          this.cdr.markForCheck();
        }
      });
    this.subscriptions.push(saveSubscr);
  }

  cancel() {
    this.router.navigate([this.url]);
  }

  getUserAvatar(): number {
    return EditUserComponent.avatarId;
  }



  get avatar(): number{
    return this.authService.currentUserValue.avatar; 
  }

  get firstName(): string{
    console.log(this.authService.currentUserValue.firstName);
    return this.authService.currentUserValue.firstName; 
  }

  get lastName(): string{
    return this.authService.currentUserValue.lastName; 
  }

  get gender(): string{
    return this.authService.currentUserValue.gender; 
  }



  static setUser(user: number) {

    EditUserComponent.avatarId = user;

  }

  deleteUser() {
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

  private get url() {
    return this.authService.currentAuthValue.userRole === "ADMIN" ? 'pages/agent' : 'pages/client';
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


