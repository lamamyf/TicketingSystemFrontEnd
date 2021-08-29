import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgentHomePageComponent } from './agentHome.component';
import { DashboardsModule } from '../../_metronic/partials/content/dashboards/dashboards.module';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgApexchartsModule} from 'ng-apexcharts';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AgentHomePageComponent],
    imports: [
        MatDialogModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: AgentHomePageComponent,
            },
        ]),
        DashboardsModule,
        InlineSVGModule,
        NgApexchartsModule,
        ReactiveFormsModule,
    ],
})
export class AgentHomePageModule {}
