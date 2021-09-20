import { DetailedTicket } from './../../../models/detailedTicket';
import { AgentService } from './../services/agent.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AuthService, UserModel } from '../../auth';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TicketViewDialogComponent } from '../../shared/TicketViewDialog/TicketViewDialog';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TicketModel } from 'src/app/models/ticket.model';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './agentHome.component.html',
  styleUrls: ['./agentHome.component.scss']
})
export class AgentHomePageComponent implements OnInit {
  dialogRefView: MatDialogRef<TicketViewDialogComponent>;
  @Input() widgetHeight = '150px';
  @Input() widgetWidth = '400px';
  currentUser: UserModel;
  tickets$: Observable<DetailedTicket>;
  refetchTickets$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor(
    public dialog: MatDialog,
    private authenticationService: AuthService,
    private agentService: AgentService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
  ) {
    this.authenticationService.currentUser$.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.tickets$ = this.refetchTickets$.pipe(
      switchMap(
        _ => this.agentService
          .getTickets()
      )
    );
  }


  ViewTicket(ticket: TicketModel) {
    this.dialogRefView = this.dialog.open(TicketViewDialogComponent, {
      disableClose: false,
      width: '400px',
      height: '550px',
      data: { id: ticket.id }
    });
    this.dialogRefView.afterClosed().subscribe(result => {
      if(result){
        this.refetchTickets$.next(true);
        this.snackBar.open('تم تحديث حالة الطلب بنجاح', '', {
          duration: 2500
        })
      }
      
      this.dialogRefView = null;
      this.cdr.detectChanges();
    });
  }
}
