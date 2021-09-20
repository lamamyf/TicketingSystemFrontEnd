import { ClientService } from './../../client/services/client.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TicketModel } from 'src/app/models/ticket.model';
import { AuthService } from '../../auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgentService } from '../../agent/services/agent.service';
@Component({
  selector: 'app-TicketViewdialog',
  templateUrl: './TicketViewDialog.html',
  styleUrls: ['./TicketViewDialog.scss'],
})
export class TicketViewDialogComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  ticket: TicketModel;
  updatedTicketStatus;
  constructor(public dialogRef:
    MatDialogRef<TicketViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private clientService: ClientService,
    private agentService: AgentService,
  ) {}

  ngOnInit(): void {
    this.getTicket();
  }

  getTicket(){
    this.clientService.getTicket(this.data.id)
    .subscribe((result: any) => {
      this.ticket = result;
      this.updatedTicketStatus = this.ticket.status;
    });
  }

  updateTicketStatus() {
    this.agentService.updateTicketStatus(this.updatedTicketStatus, this.data.id).subscribe(
      ()=>{
        this.dialogRef.close({ data: true })
      }
    );
  }


  getUserType(): string {
    return this.authService.currentAuthValue.userRole;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
