import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatInputModule } from '@angular/material/input';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { WidgetsModule } from 'src/app/_metronic/partials/content/widgets/widgets.module';
import { EditUserComponent } from './editUser/editUser.component';
import { ChangePasswordComponent } from './changePassword/change-password.component';
@NgModule({
  declarations: [EditUserComponent,
    ChangePasswordComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    InlineSVGModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    WidgetsModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
  ]
})
export class UserManagementModule { }
