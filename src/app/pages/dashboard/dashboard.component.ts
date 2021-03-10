import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
  public chartOptions: Partial<ChartOptions>;
  @ViewChild('chart', { static: false }) chart: ChartComponent;
  currentUser: UserModel;
  activeTabId:
      | 'topbar_systemStatus'
      | 'topbar_systemType'
      | 'topbar_lockStatus' = 'topbar_systemStatus';
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
      private cdr: ChangeDetectorRef,
  ) {
    this.loadData();

    this.chartOptions = {
      colors: ['#84DCC6', '#FF686B'],
      series: [],
      chart: {
        width: 550,
        type: 'pie',
      },
      labels: [],
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

    this.authenticationService.currentUser$.subscribe(x => this.currentUser = x);

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
          this.totalSecured = results.totalSecuredDevice;
          this.totalUnsecured = results.totalUnsecuredDevice;
          this.totalLocked = results.totalLocked;
          this.totalUnlocked = results.totalUnlocked;
          this.chartOpt([this.totalSecured, this.totalUnsecured], [' آمن', ' غير آمن']);
          this.cdr.markForCheck();
        });

  }

  chartOpt(chartSeries, chartLabels): void {

    this.chartOptions = {
      colors: ['#84DCC6', '#FF686B'],
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
