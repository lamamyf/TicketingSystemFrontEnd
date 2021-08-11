import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardsModule } from '../../_metronic/partials/content/dashboards/dashboards.module';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgApexchartsModule} from 'ng-apexcharts';
import { TicketViewComponent } from './TicketView.component';

@NgModule({
  declarations: [TicketViewComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: TicketViewComponent
            },
        ]),
        DashboardsModule,
        InlineSVGModule,
        NgApexchartsModule,
    ],
})
export class TicketViewModel {}
