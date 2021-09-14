import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/confirmation-dialog/confirmation-dialog';
import { LayoutService } from '../../../../../../_metronic/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit, OnDestroy {
  ulCSSClasses: string;
  rootArrowEnabled: boolean;
  location: Location;
  headerMenuDesktopToggle: string;
  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  dashboardUrl: string;
  private unsubscribe: Subscription[] = [];

  constructor(private layout: LayoutService, public dialog: MatDialog, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.ulCSSClasses = this.layout.getStringCSSClasses('header_menu_nav');
    this.rootArrowEnabled = this.layout.getProp('header.menu.self.rootArrow');
    this.headerMenuDesktopToggle = this.layout.getProp(
      'header.menu.desktop.toggle'
    );
    this.dashboardUrl = this.authService.currentAuthValue.userRole === "ADMIN" ? '/pages/agent' : '/pages/client';
  }

  logout() {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      width: '500px',
      height: '170px'
    });
    this.dialogRef.componentInstance.confirmMessage = 'هل أنت متأكد من تسجيل الخروج ؟';
    this.dialogRef.componentInstance.doSomthing = () =>{
      this.doLogout();
    }
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });

  }

  doLogout() {
    const logoutSubscr = this.authService
      .logout()
      .pipe(first())  
      .subscribe(() => {
        this.router.navigate(['/auth/login']);
      });
      
    this.unsubscribe.push(logoutSubscr);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
