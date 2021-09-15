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
  tickets: TicketModel[];
  isLoading$: Observable<boolean>;
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
    this.loadTickets();
    this.authenticationService.currentUser$.subscribe(x => this.currentUser = x);

  }


  loadTickets(): void {
    this.clientService
      .getTickets()
      .subscribe((result: any) => {
        this.tickets = result;
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
      this.dialogRef = null;

    });
  }


  ViewTicket(ticket: TicketModel) {
    this.dialogRefView = this.dialog.open(TicketViewDialogComponent, {
      disableClose: false,
      width: '400px',
      height: '550px',
      data: {id: ticket.id}
    });


    this.dialogRefView.afterClosed().subscribe(result => {


    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
