import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';

import {InlineSVGModule} from 'ng-inline-svg';
import {NgApexchartsModule} from 'ng-apexcharts';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardsModule } from 'src/app/_metronic/partials/content/dashboards/dashboards.module';
import { AgentHomePageComponent } from './AgentHomePage/agentHome.component';

@NgModule({
  declarations: [AgentHomePageComponent],
  imports: [
    CommonModule,
    AgentRoutingModule,
    MatDialogModule,
    DashboardsModule,
    InlineSVGModule,
    NgApexchartsModule,
    ReactiveFormsModule,
  ]
})
export class AgentModule { }
