import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EditUserComponent } from '../../user-management/editUser/editUser.component';
import { AuthService, UserModel } from '../../auth';
import { NgZone } from '@angular/core';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatarsDialog.html',
    styleUrls: ['./avatarsDialog.scss'],

})



export class AvatarsDialogComponent {

    static currentAvatar: number;
  
    constructor(public dialogRef: MatDialogRef<AvatarsDialogComponent> ,     private authService: AuthService,private ngZone: NgZone,
       private fb: FormBuilder, private router: Router
        ) {

            let avatars = [-1, 0, 1, 2,3,4,5,6,7,8,9,10];
            //change later based on
        

    }
    

    

   avatarComponent: AvatarsDialogComponent;
    private unsubscribe: Subscription[] = []; 

    
  

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
