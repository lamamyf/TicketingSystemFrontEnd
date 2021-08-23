import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig , MatDialogState , MatDialogContent} from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { TicketModel } from 'src/app/modules/auth/_models/ticket.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-confirmdialog',
    templateUrl: './TicketAddDialog.html',
    styleUrls: ['./TicketAddDialog.scss'],

})



//changed
export class TicketAddDialogComponent {

  //changed
    constructor(public dialogRef: MatDialogRef<TicketAddDialogComponent> ,  private fb: FormBuilder,
        ) {



    }
    
    addTicketForm : FormGroup;

    

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
    public confirmMessage: string;
}
