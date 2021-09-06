import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/auth';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/confirmation-dialog/confirmation-dialog';
import { LayoutService } from '../../../../../../_metronic/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  ulCSSClasses: string;
  rootArrowEnabled: boolean;
  location: Location;
  headerMenuDesktopToggle: string;
  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  dashboardUrl: string;

  constructor(private layout: LayoutService ,  public dialog: MatDialog, private authService :AuthService) {
  }

  ngOnInit(): void {
    this.ulCSSClasses = this.layout.getStringCSSClasses('header_menu_nav');
    this.rootArrowEnabled = this.layout.getProp('header.menu.self.rootArrow');
    this.headerMenuDesktopToggle = this.layout.getProp(
      'header.menu.desktop.toggle'
    );
    this.dashboardUrl = this.authService.currentAuthValue.userRole  === "ADMIN" ? '/pages/agent' : '/pages/client';
  }




  logout(){

    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      width: '500px',
      height: '170px'
  });
  this.dialogRef.componentInstance.confirmMessage = 'هل آنت متآكد من تسجيل الخروج ؟';
  this.dialogRef.afterClosed().subscribe(result => {

    this.dialogRef = null;
  });

  }
}
