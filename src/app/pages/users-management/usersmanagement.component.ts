import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { LayoutService } from '../../_metronic/core/';
import {AuthService, UserModel} from '../../modules/auth';
import {ApiService} from '../../services/api.service';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-usersmanagement',
  templateUrl: './usersmanagement.component.html',
  styleUrls: ['./usersmanagement.component.scss'],
})
export class UsersmanagementComponent implements OnInit {

   dialogRef: MatDialogRef<ConfirmationDialogComponent>;
   displayedColumns = ['username', 'roles', 'actions'];
   dataSource: MatTableDataSource<UserModel>;
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private layout: LayoutService, private el: ElementRef,
              private authenticationService: AuthService,
              private apiService: ApiService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
      this.loadUsers();
  }

  ngOnInit(): void {
  }

  loadUsers(): void {
      this.apiService
        .getAllUsers()
        .subscribe((users: UserModel[]) => {
            this.dataSource = new MatTableDataSource(users);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
  }

  applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }

  deleteUser(user: UserModel) {
      this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          disableClose: false,
          width: '500px',
          height: '170px'
      });
      this.dialogRef.componentInstance.confirmMessage = 'هل آنت متآكد من حذف الحساب ' + user.firstName+" "+user.lastName + ' ؟';
      this.dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.apiService
                  .deleteUser(user.id).pipe()
                  .subscribe((data: Response) => {
                      const resStr = JSON.stringify(data);
                      const resJSON = JSON.parse(resStr);
                      if (resJSON.statusCodeValue === 200){
                          this.loadUsers();
                          this.snackBar.open('تم حذف المستخدم بنجاح', '', {
                              duration: 2000,
                          });
                      }
                  });
          }
          this.dialogRef = null;
      });
  }
}
