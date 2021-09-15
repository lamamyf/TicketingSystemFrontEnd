import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { TicketModel } from 'src/app/models/ticket.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './TicketAddDialog.html',
  styleUrls: ['./TicketAddDialog.scss'],

})

export class TicketAddDialogComponent implements OnDestroy {
  public confirmMessage: string;
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<TicketAddDialogComponent>,
    private fb: FormBuilder,
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
  ) {
    this.isLoading$ = this.clientService.isLoadingSubject.asObservable();
  }

  addTicketForm: FormGroup;

  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  isWrong: boolean;
  errorMessage: any;

  ticket: TicketModel;


  ngOnInit() {
    this.hasError = false;
    this.initForm();
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

    this.addTicketForm = this.fb.group({
      subject: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),])],

      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),])],
      category: ['', Validators.required],
    });
  }

  submit() {
    this.errorMessage = '';
    this.isWrong = false;
    this.hasError = false;

    const saveSubscr = this.clientService
      .addTicket(this.addTicketForm.value).subscribe(result => {
        if (result.success) {
          this.snackBar.open('تم رفع الطلب بنجاح', '', {
            duration: 2500
          })
        } else {
          this.hasError = !result.success;
          if (result.response.errorMessage[0].message)
            this.errorMessage = result.response.errorMessage[0].message;
          this.cdr.markForCheck();
        }
      });
    this.subscriptions.push(saveSubscr);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
