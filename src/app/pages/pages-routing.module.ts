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
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'agentHome',
        loadChildren: () =>
          import('../modules/agent/agent.module').then((m) => m.AgentModule),
      },

      {
        path: 'about',
        loadChildren: () =>
          import('../modules/aboutUs/about.module').then((m) => m.AboutModule),
      },


      {
        path: 'dashboard/ticketView',
        loadChildren: () =>
          import('./Ticketview/TicketView.module').then((m) => m.TicketViewModule),
      },
      {


        path: 'dashboard/addTicket',
        loadChildren: () =>
          import('./addTickets/addTicket.module').then((m) => m.AddTicketModule),
      },


      
      

      {
        path: 'usersManagement',
        loadChildren: () =>
          import('../modules/users-management/usersmanagement.module').then(
            (m) => m.UsersmanagementModule
          ),
      },
      {
        path: 'change-password',
        loadChildren: () =>
            import('../modules/users-management/changePassword/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },
      {
        path: 'editUser',
        loadChildren: () =>
            import('../modules/users-management/editUser/editUser.module').then(
            (m) => m.EditUserModule
          ),
      },

   
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
