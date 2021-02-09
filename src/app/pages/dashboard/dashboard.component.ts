import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from 'ng-apexcharts';
import {Router} from '@angular/router';
import {AuthService, UserModel} from '../../modules/auth';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  colors: any;
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() widgetHeight = '150px';
  @Input() widgetWidth = '400px';
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  currentUser: UserModel;

  constructor(
      private router: Router,
      private authenticationService: AuthService
  ) {
    this.authenticationService.currentUser$.subscribe(x => this.currentUser = x);
    this.chartOptions = {
      series: [44, 55],
      chart: {
        width: 550,
        type: 'donut',
      },
      labels: [' جهاز آمن', ' جهاز غير آمن'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            },
          }
        }
      ],
    };
  }

  ngOnInit(): void {
  }

}
