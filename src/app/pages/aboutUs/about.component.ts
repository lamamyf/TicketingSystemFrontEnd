import {
    Component,
    ChangeDetectionStrategy,
    OnDestroy,
    OnInit,
  } from '@angular/core';
  import { Router, NavigationEnd } from '@angular/router';
  import { Subscription } from 'rxjs';


  @Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })


  export class AboutComponent implements OnInit, OnDestroy {
    private unsubscribe: Subscription[] = []; 
    lang;
    dir;

  
    ngOnInit() {
     
    }
  
    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
  }
  