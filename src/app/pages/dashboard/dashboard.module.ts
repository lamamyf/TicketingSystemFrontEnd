import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardsModule } from '../../_metronic/partials/content/dashboards/dashboards.module';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgApexchartsModule} from 'ng-apexcharts';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent],
    imports: [
        MatDialogModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
            },
        ]),
        DashboardsModule,
        InlineSVGModule,
        NgApexchartsModule,
        ReactiveFormsModule,
    ],
})
export class DashboardModule {}
