import { switchMap } from 'rxjs/operators';
import { ClientService } from './../services/client.service';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { AuthService, UserModel } from '../../auth';
import { TicketModel } from 'src/app/models/ticket.model';


import { TicketAddDialogComponent } from '../TicketAddDialog/TicketAddDialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TicketViewDialogComponent } from '../../shared/TicketViewDialog/TicketViewDialog';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  dialogRef: MatDialogRef<TicketAddDialogComponent>;
  dialogRefView: MatDialogRef<TicketViewDialogComponent>;
  subscriptions: Subscription[] = [];
  tickets$: Observable<TicketModel>;
  isLoading$: Observable<boolean>;
  refetchTickets$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  //ticket: TicketModel;
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
    this.authenticationService.currentUser$.subscribe(x => this.currentUser = x);

  }
  ngOnInit(): void {
    this.tickets$ = this.refetchTickets$.pipe(
      switchMap(
        _ => this.clientService
          .getTickets()
      )
    );
  }


  loadTickets(): void {
    this.clientService
      .getTickets()
      .subscribe((result: any) => {
        this.tickets$ = result;
        this.cdr.markForCheck();
      });

  }


  addTicket() {
    this.dialogRef = this.dialog.open(TicketAddDialogComponent, {
      disableClose: false,
      width: '700px',
      height: '600px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.refetchTickets$.next(true);
      this.dialogRef = null;

    });
  }


  ViewTicket(ticket: TicketModel) {
    this.dialogRefView = this.dialog.open(TicketViewDialogComponent, {
      disableClose: false,
      width: '400px',
      height: '550px',
      data: { id: ticket.id }
    });


    this.dialogRefView.afterClosed().subscribe(result => {


    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
