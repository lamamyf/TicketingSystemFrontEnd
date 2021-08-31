import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../modules/shared/_layout/layout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../modules/client/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'agent',
        loadChildren: () =>
          import('../modules/agent/agent.module').then((m) => m.AgentModule),
      },

      {
        path: 'about',
        loadChildren: () =>
          import('../modules/aboutUs/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('src/app/modules/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },

      // {
      //   path: 'change-password',
      //   loadChildren: () =>
      //     import('../modules/user-management/changePassword/change-password.module').then(
      //       (m) => m.ChangePasswordModule
      //     ),
      // },
      // {
      //   path: 'editUser',
      //   loadChildren: () =>
      //     import('../modules/user-management/editUser/editUser.module').then(
      //       (m) => m.EditUserModule
      //     ),
      // },


      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
