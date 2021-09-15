import { ClientService } from './../services/client.service';
import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';

import { AuthService, UserModel } from '../../auth';
import { TicketModel } from 'src/app/models/ticket.model';


import { TicketAddDialogComponent } from '../TicketAddDialog/TicketAddDialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TicketViewDialogComponent } from '../../shared/TicketViewDialog/TicketViewDialog';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  dialogRef: MatDialogRef<TicketAddDialogComponent>;
  dialogRefView: MatDialogRef<TicketViewDialogComponent>;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  ticket: TicketModel;
  @Input() widgetHeight = '150px';
  @Input() widgetWidth = '400px';
  currentUser: UserModel;

  constructor(
    public dialog: MatDialog,
    private authenticationService: AuthService,
    private clientService: ClientService,
    private cdr: ChangeDetectorRef,
  ) {
    this.isLoading$ = this.clientService.isLoadingSubject.asObservable();
    //  this.loadData();
    this.authenticationService.currentUser$.subscribe(x => this.currentUser = x);

  }
 

  loadData(): void {
    // this.apiService
    //   .getDashboardData()
    //   .subscribe((results: any) => {
    //     this.cdr.markForCheck();
    //   });

  }




  getTicketByUser(): TicketModel[] {


    //dummy data
    let tickets: TicketModel[] = [

      {
        id: 1,
        userId: 1,
        userFirstName: "nouf",
        userLastName: "aljufair",
        subject: "١طلب",
        description: "احتياج ادوات ونقص وطلب",
        status: "RECEIVED",
        category: "شكوى",
        createdDate: "11-11-2021",

      },
      {
        id: 1,
        userId: 1,
        userFirstName: "nouf",
        userLastName: "aljufair",
        subject: "٢طلب",
        description: "وصف للمشكلة",
        status: "CLOSED",
        category: "شكوى",
        createdDate: "11-11-2021",

      },
      {
        id: 1,
        userId: 1,
        userFirstName: "nouf",
        userLastName: "aljufair",
        subject: "٣طلب",
        description: "مدري",
        status: "PENDING",
        category: "شكوى",
        createdDate: "11-11-2021",

      },
      {
        id: 1,
        userId: 1,
        userFirstName: "nouf",
        userLastName: "aljufair",
        subject: "٤طلب",
        description: "سيكيورتي بريتش",
        status: "RECEIVED",
        category: "اقتراح",
        createdDate: "11-11-2021",

      }, {
        id: 1,
        userId: 1,
        userFirstName: "nouf",
        userLastName: "aljufair",
        subject: "٥طلب",
        description: "نقص ادوات",
        status: "PENDING",
        category: "اخرى",
        createdDate: "11-11-2021",

      },
      {
        id: 2,
        userId: 2,
        userFirstName: "aaaaa",

        userLastName: "aljufair",
        subject: "٦طلب",
        description: "اسستم خربان",
        status: "CLOSED",
        category: "اقتراح",
        createdDate: "11-11-2021",

      }
    ];


    return tickets;
  }


  addTicket() {
    this.dialogRef = this.dialog.open(TicketAddDialogComponent, {
      disableClose: false,
      width: '700px',
      height: '600px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;

    });
  }


  ViewTicket() {

    this.dialogRefView = this.dialog.open(TicketViewDialogComponent, {
      disableClose: false,
      width: '400px',
      height: '550px'
    });


    this.dialogRefView.afterClosed().subscribe(result => {


    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
