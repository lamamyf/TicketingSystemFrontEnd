import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { TicketModel } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './TicketAddDialog.html',
  styleUrls: ['./TicketAddDialog.scss'],

})

export class TicketAddDialogComponent {

  constructor(public dialogRef: MatDialogRef<TicketAddDialogComponent>, private fb: FormBuilder,
  ) { }

  addTicketForm: FormGroup;

  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  isWrong: boolean;
  errorMessage: any;

  private unsubscribe: Subscription[] = [];
  ticket: TicketModel;
 

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  initForm() {
    this.addTicketForm = this.fb.group({
      subject: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
      description: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],

      category: [
      '',
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
