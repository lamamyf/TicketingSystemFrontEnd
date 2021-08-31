import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig , MatDialogState , MatDialogContent} from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { TicketModel } from 'src/app/models/ticket.model';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NumericLiteral } from 'typescript';
import { EditUserComponent } from '../../user-management/editUser/editUser.component';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatarsDialog.html',
    styleUrls: ['./avatarsDialog.scss'],

})



//changed
export class AvatarsDialogComponent {

    static currentAvatar: number;

  //changed
    constructor(public dialogRef: MatDialogRef<AvatarsDialogComponent> ,  private fb: FormBuilder, private router: Router
        ) {

            let avatars = [-1, 0, 1, 2,3,4,5,6,7,8,9,10];
            //change later based on
          AvatarsDialogComponent.currentAvatar = -1;

    }
    

    

   avatarComponent: AvatarsDialogComponent;
    private unsubscribe: Subscription[] = []; 

    lang;
    dir;
    id: any;

  

    getAvatars(): number[]{

        let avatars = [-1, 0, 1, 2,3,4,5,6,7,8,9,10];
        return avatars;
    }
   
    


    changeAvater(id :number){

        EditUserComponent.setUser(id);

    }



    ngOnInit() {
        this.initForm();
        
    }

  
  
    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }



    initForm() {

      
      }
    
  
    public confirmMessage: string;
}
