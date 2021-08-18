import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

;
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
        path: 'about',
        loadChildren: () =>
          import('./aboutUs/about.module').then((m) => m.AboutModule),
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
          import('./users-management/usersmanagement.module').then(
            (m) => m.UsersmanagementModule
          ),
      },
      {
        path: 'usersManagement/addNewUser',
        loadChildren: () =>
          import('./users-management/addNewUser/addNewUser.module').then(
            (m) => m.AddNewUserModule
          ),
      },
      {
        path: 'change-password',
        loadChildren: () =>
            import('./users-management/changePassword/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },
      {
        path: 'editUser',
        loadChildren: () =>
            import('./users-management/editUser/editUser.module').then(
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
