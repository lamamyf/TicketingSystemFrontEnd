import {
    Component,
    ChangeDetectionStrategy,
    OnDestroy,
    OnInit,
  } from '@angular/core';
  import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
  import { Observable, Subscription } from 'rxjs';
import { TicketModel } from 'src/app/modules/auth/_models/ticket.model';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {  FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';

import {Directive} from '@angular/core';




interface Category {
    value: string;
    viewValue: string;
  }
  


  @Component({
    selector: 'addTicket-view',
    templateUrl: './addTicket.component.html',
    styleUrls: ['./addTicket.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })


  export class AddTicketComponent implements OnInit, OnDestroy {
    addTicketForm : FormGroup;

    category: Category[] = [
        {value: 'Complaint', viewValue: 'شكوى'},
        {value: 'Suggestion.', viewValue: 'اقتراح'},
        {value: 'Other', viewValue: 'اخرى'}
      ];



    defaultAuth: any = {
        subject: '',
        password: '',
      };
    hasError: boolean;
    returnUrl: string;
    isLoading$: Observable<boolean>;
    isWrong: boolean;
    errorMessage: any;
  
    private unsubscribe: Subscription[] = []; 
    ticket: TicketModel;

    lang;
    dir;
      id: any;

  
   
    constructor(
        private fb: FormBuilder,

        
      ) {
       
      }


    ngOnInit() {
        this.initForm();
        
    }

  
  
    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }



    initForm() {
        this.addTicketForm = this.fb.group({
          subject: [
            this.defaultAuth.subject,
            Validators.compose([
              Validators.required,
                Validators.pattern('[A-Za-z._%-]{3}')
            ]),
          ],
          password: [
            this.defaultAuth.password,
            Validators.compose([
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(100),
            ]),
          ],
        });
      }
    
  submit() {
    this.errorMessage = '';
    this.isWrong = false;
    this.hasError = false;
   
      


      
  }


  }
  