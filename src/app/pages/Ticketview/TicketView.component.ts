import {
    Component,
    ChangeDetectionStrategy,
    OnDestroy,
    OnInit,
  } from '@angular/core';
  import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
  import { Subscription } from 'rxjs';
import { TicketModel } from 'src/app/modules/auth/_models/ticket.model';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



  

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'ticket-view',
    templateUrl: './TicketView.cpmponent.html',
    styleUrls: ['./TicketView.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class TicketViewComponent implements OnInit, OnDestroy {
    private unsubscribe: Subscription[] = []; 
    ticket: TicketModel;

    lang;
    dir;
      id: any;

  
   
    constructor(
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


this.id = this.ticket.id;


    }

  
    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }






 getTicket(): TicketModel [] {


    let t: TicketModel[] = [

        {
        id: 8,
        userId: 2,
        userFirstName: "nouf",
        userLastName: "aljufair",
        subject: "طلب",
        description: "ssssss",
        status: "Received",
        category: "complaint",
        createdDate: "11-11-2021",
  
      }
     ];
  
  
return t;


    }



  }
  