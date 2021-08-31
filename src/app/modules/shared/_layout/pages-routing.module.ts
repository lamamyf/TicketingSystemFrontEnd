import { ClientModule } from '../../client/client.module';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'client',
        loadChildren: () =>
          import('../../client/client.module').then((m) => m.ClientModule),
      },
      {
        path: 'agent',
        loadChildren: () =>
          import('../../agent/agent.module').then((m) => m.AgentModule),
      },

      {
        path: 'about',
        loadChildren: () =>
          import('../../aboutUs/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('src/app/modules/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {//redircte based on role
        path: '',
        loadChildren: () =>
          import('../../client/client.module').then((m) => m.ClientModule)
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
