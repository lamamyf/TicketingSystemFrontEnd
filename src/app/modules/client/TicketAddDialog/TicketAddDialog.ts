import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { TicketModel } from 'src/app/models/ticket.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-confirmdialog',
    templateUrl: './TicketAddDialog.html',
    styleUrls: ['./TicketAddDialog.scss'],

})



//changed
export class TicketAddDialogComponent {

  //changed
    constructor(public dialogRef: MatDialogRef<TicketAddDialogComponent> ,  private fb: FormBuilder, private router: Router
        ) {



    }
    
    addTicketForm : FormGroup;

    

    defaultAuth: any = {
        subject: '',
        description: '',
        cat: '',
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
                
            ]),
          ],
          description: [
            this.defaultAuth.description,
            Validators.compose([
              Validators.required,
             
              
            ]),
          ],

          cat: [
            this.defaultAuth.cat,
            Validators.compose([
              Validators.required,
              
            ]),
          ],
        });
      }
    
  submit() {
    this.errorMessage = '';
    this.isWrong = false;
    this.hasError = false;
   
  window.alert("تم رفع الطلب بنجاح");



  }
    public confirmMessage: string;
}
