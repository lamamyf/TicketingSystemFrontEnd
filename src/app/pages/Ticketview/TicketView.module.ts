import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardsModule } from '../../_metronic/partials/content/dashboards/dashboards.module';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgApexchartsModule} from 'ng-apexcharts';
import { TicketViewComponent } from './TicketView.component';
import {ReactiveFormsModule} from '@angular/forms';


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
        ReactiveFormsModule,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class TicketViewModule {}
