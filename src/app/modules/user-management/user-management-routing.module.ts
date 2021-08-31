
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserComponent } from './editUser/editUser.component';
import { ChangePasswordComponent } from './changePassword/change-password.component';

const routes: Routes = [
        {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'edit-user',
        component: EditUserComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
