import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { LayoutService } from '../../_metronic/core/';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiService} from '../../services/api.service';
import {ResultModel} from '../../models/result.model';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  displayedColumns = ['id', 'deviceName', 'systemStatus', 'compromised', 'currentSystemVersion', 'appVersion'];
  dataSource: MatTableDataSource<ResultModel>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private layout: LayoutService, private el: ElementRef,
              private apiService: ApiService) {
    this.loadResults();
  }

  ngOnInit(): void {
  }

  loadResults(): void {
    this.apiService
        .getAllResults()
        .subscribe((results: ResultModel[]) => {
          this.dataSource = new MatTableDataSource(results);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
