import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/guards/auth.guard';
import { ProtectedResourceGuard } from './services/guards/protected-resource.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: 'pages',
    canActivate: [ProtectedResourceGuard],
    loadChildren: () =>
      import('src/app/modules/shared/layout.module').then((m) => m.LayoutModule),
  },
  { path: '', redirectTo: 'auth/', pathMatch: 'full'},
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [
    MatFormFieldModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
