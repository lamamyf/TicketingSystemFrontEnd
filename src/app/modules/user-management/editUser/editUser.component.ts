import { UpdateUserDto } from './../../../models/updateUser.dto';
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
    public userManagentService: UserManagentService,
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
      firstName: [this.firstName, Validators.compose([
        Validators.required,
        Validators.minLength(3),])],

      lastName: [this.lastName, Validators.compose([
        Validators.required,
        Validators.minLength(3),])],
      gender: [this.gender, Validators.required],
      avatar: [this.getUserAvatar]

    });
  }



  save() {
    const saveSubscr = this.userManagentService
      .editUser(new UpdateUserDto(this.formGroup.value, EditUserComponent.avatarId)).subscribe(response => {
        console.log(response);
        if (response.success) {
          this.snackBar.open('تم تعديل المستخدم بنجاح', '', {
            duration: 2500
          })
          location.reload();
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

  get avatar(): number {
    return this.authService.currentUserValue.avatar;
  }

  get firstName(): string {
    return this.authService.currentUserValue.firstName;
  }

  get lastName(): string {
    return this.authService.currentUserValue.lastName;
  }

  get gender(): string {
    return this.authService.currentUserValue.gender;
  }



  static setUser(user: number) {
    EditUserComponent.avatarId = user;
  }

  private get url() {
    return this.authService.currentAuthValue.userRole === "ADMIN" ? 'pages/agent' : 'pages/client';
  }

  deleteUser() {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      width: '500px',
      height: '170px'
    });

    this.dialogRef.componentInstance.confirmMessage = `هل أنت متأكد من حذف الحساب؟ ${this.lastName} ${this.firstName}`;
    this.dialogRef.componentInstance.doSomthing = () => {
      console.log(this.userManagentService);
      this.userManagentService
        .deleteUser().pipe()
        .subscribe((response) => {
          console.log(response);
          if (response.success) {
            this.router.navigate(['/auth/login']);
            this.snackBar.open('تم حذف المستخدم بنجاح', '', {
              duration: 2000,
            });
          }
        });
    };

    this.dialogRef.afterClosed().subscribe(() =>
      this.dialogRef = null
    );
  }
}


