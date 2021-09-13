import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TicketModel } from 'src/app/models/ticket.model';
import { ActivatedRoute } from '@angular/router';
import { DashboardComponent } from '../../client/dashboard/dashboard.component';
import { AuthService } from '../../auth';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-TicketViewdialog',
  templateUrl: './TicketViewDialog.html',
  styleUrls: ['./TicketViewDialog.scss'],

})



//changed

export class TicketViewDialogComponent {

  private unsubscribe: Subscription[] = [];
  ticket: TicketModel = {

    id: 8,
    userId: 2,
    userFirstName: "nouf",
    userLastName: "aljufair",
    subject: "طلب",
    description: "ssssss",
    status: "Received",
    category: "complaint",
    createdDate: "11-11-2021",


  };
  t: DashboardComponent;
  lang;
  dir;



  //changed




  constructor(public dialogRef:
    MatDialogRef<TicketViewDialogComponent>,
    private Router: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar,

  ) {

    this.Router.queryParams.subscribe(params => {
      this.ticket = params['ticket'];

    });

  }


  ngOnInit() {

    this.Router.queryParams.subscribe(params => {
      this.ticket = params['ticket'];

    });




  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }


getUserType(): string{
  return this.authService.currentAuthValue.userRole;

}

  getTicket(): TicketModel {

    return {
      id: 8,
      userId: 2,
      userFirstName: "nouf",
      userLastName: "aljufair",
      subject: " طلب أدوات",
      description: "يوجد نقص  أدوات طلب نقص ادوات تذكرة عاجلل",
      status: "Received",
      category: "شكوى",
      createdDate: "11-11-2021",

    }


  }



  save(){
   
          this.snackBar.open('تم تحديث حالة الطلب بنجاح', '', {
            duration: 2500
          })
     
        }






}
