import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig , MatDialogState , MatDialogContent} from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { TicketModel } from 'src/app/modules/auth/_models/ticket.model';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TicketViewComponent } from '../Ticketview/TicketView.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
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
t : DashboardComponent;
    lang;
    dir;
     

  
//changed



   
    constructor(public dialogRef: 
        MatDialogRef<TicketViewDialogComponent> ,
        private Router: ActivatedRoute,
        public dialog: MatDialog,
        
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

    





}