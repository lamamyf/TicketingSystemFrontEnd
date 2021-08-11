import {
    Component,
    ChangeDetectionStrategy,
    OnDestroy,
    OnInit,
  } from '@angular/core';
  import { Router, NavigationEnd } from '@angular/router';
  import { Subscription } from 'rxjs';


  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'ticket-view',
    templateUrl: './TicketView.cpmponent.html',
    styleUrls: ['./TicketView.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class TicketViewComponent implements OnInit, OnDestroy {
    private unsubscribe: Subscription[] = []; 
    lang;
    dir;

  
    ngOnInit() {
     
    }
  
    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
  }
  