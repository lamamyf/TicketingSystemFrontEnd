import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardsModule } from '../../_metronic/partials/content/dashboards/dashboards.module';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgApexchartsModule} from 'ng-apexcharts';
import { AboutComponent } from './about.component';

@NgModule({
  declarations: [AboutComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: AboutComponent
            },
        ]),
        DashboardsModule,
        InlineSVGModule,
        NgApexchartsModule,
    ],
})
export class AboutModule {}
