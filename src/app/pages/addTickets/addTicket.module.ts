import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardsModule } from '../../_metronic/partials/content/dashboards/dashboards.module';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgApexchartsModule} from 'ng-apexcharts';
import { AddTicketComponent } from './addTicket.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddTicketComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: AddTicketComponent
                

            },
        ]),
        DashboardsModule,
        InlineSVGModule,
        NgApexchartsModule,
        ReactiveFormsModule,
    ],
})
export class AddTicketModule {}
