import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgApexchartsModule} from 'ng-apexcharts';
import {HttpClientModule} from '@angular/common/http';
import {CRUDTableModule} from '../../../_metronic/shared/crud-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownMenusModule} from '../../../_metronic/partials/content/dropdown-menus/dropdown-menus.module';
import {NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {WidgetsModule} from '../../../_metronic/partials/content/widgets/widgets.module';

@NgModule({
  declarations: [ChangePasswordComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ChangePasswordComponent,
            },
        ]),
        InlineSVGModule,
        NgApexchartsModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        InlineSVGModule,
        NgbTooltipModule,
        WidgetsModule
    ],
})
export class ChangePasswordModule {}
