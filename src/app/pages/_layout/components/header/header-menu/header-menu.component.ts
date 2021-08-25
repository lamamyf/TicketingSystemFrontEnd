import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/pages/confirmation-dialog/confirmation-dialog';
import { LayoutService } from '../../../../../_metronic/core';

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

  constructor(private layout: LayoutService ,  public dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.ulCSSClasses = this.layout.getStringCSSClasses('header_menu_nav');
    this.rootArrowEnabled = this.layout.getProp('header.menu.self.rootArrow');
    this.headerMenuDesktopToggle = this.layout.getProp(
      'header.menu.desktop.toggle'
    );
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
