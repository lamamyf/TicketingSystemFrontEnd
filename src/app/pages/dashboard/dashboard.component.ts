import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from 'ng-apexcharts';
import {Router} from '@angular/router';
import {AuthService, UserModel} from '../../modules/auth';
import {ApiService} from '../../services/api.service';

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
  activeTabId:
      | 'topbar_systemType'
      | 'topbar_systemStatus'
      | 'topbar_lockStatus' = 'topbar_systemType';
  totalUsers;
  totalResults;
  totalAndroid;
  totalIOS;
  totalSecured;
  totalUnsecured;
  totalLocked;
  totalUnlocked;

  constructor(
      private router: Router,
      private authenticationService: AuthService,
      private apiService: ApiService,
  ) {
    this.loadData();

    this.authenticationService.currentUser$.subscribe(x => this.currentUser = x);

    // @ts-ignore
    this.chartOptions = {series: [], chart: {}};

  }

  ngOnInit(): void {
  }

  setActiveTabId(tabId) {
    this.activeTabId = tabId;
    if (tabId === 'topbar_systemStatus') {
      this.chartOpt([this.totalSecured, this.totalUnsecured], [' آمن', ' غير آمن']);
    }
    else if (tabId === 'topbar_systemType') {
      this.chartOpt([this.totalAndroid, this.totalIOS], [' جهاز Android', ' جهاز IOS']);
    }
    else {
      this.chartOpt([this.totalLocked, this.totalUnlocked], [' يوجد قفل', ' لا يوجد قفل']);
    }

  }

  getActiveCSSClasses(tabId) {
    if (tabId !== this.activeTabId) {
      return '';
    }
    return 'active show';
  }

  loadData(): void {
    this.apiService
        .getDashboardData()
        .subscribe((results: any) => {
          this.totalResults = results.totalResults;
          this.totalUsers = results.totalUsers;
          this.totalAndroid = results.totalAndroid;
          this.totalIOS = results.totalIOS;
          this.chartOpt([this.totalAndroid, this.totalIOS], [' جهاز IOS', ' جهاز Android']);
          this.totalSecured = results.totalSecuredDevice;
          this.totalUnsecured = results.totalUnsecuredDevice;
          this.totalLocked = results.totalLocked;
          this.totalUnlocked = results.totalUnlocked;
        });

  }

  chartOpt(chartSeries, chartLabels): void {

    this.chartOptions = {
      series: chartSeries,
      chart: {
        width: 550,
        type: 'pie',
      },
      labels: chartLabels,
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



}
