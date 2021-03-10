import {
  Component,
  ViewChild,
  ElementRef, AfterViewInit, ChangeDetectorRef,
} from '@angular/core';
import { LayoutService } from '../../_metronic/core/';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ApiService} from '../../services/api.service';
import {ResultModel} from '../../models/result.model';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements AfterViewInit {
  displayedColumns = ['id', 'deviceName', 'systemStatus', 'compromised', 'currentSystemVersion', 'appVersion', 'actions'];
  dataSource: MatTableDataSource<ResultModel>;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  totalElements = 0;
  pageSize;

  constructor(private layout: LayoutService, private el: ElementRef,
              private apiService: ApiService,
              private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.getPage(0);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  download(row){
    const file = new window.Blob([JSON.stringify(row)], { type: 'text/plain' });
    const downloadAncher = document.createElement('a');
    downloadAncher.style.display = 'none';
    const fileURL = URL.createObjectURL(file);
    downloadAncher.href = fileURL;
    downloadAncher.download = row.id;
    downloadAncher.click();
  }

  getPage(page: number){

    this.apiService.getPageableResults(page)
        .subscribe(
            (response: ResultsResponse) => {
              this.dataSource = new MatTableDataSource(response.content);
              this.totalElements = response.totalElements;
              this.pageSize = response.size;
              this.dataSource.sort = this.sort;
              this.cdr.markForCheck();
            },
            (error) => {
              console.log(error);
            }
        );
  }

  onChangePage(event: PageEvent) {
    this.pageSize = +event.pageSize;
    const currentPage = +event.pageIndex ;
    this.getPage(currentPage);
  }

}

export interface ResultsResponse {
  content: ResultModel[];
  totalElements: number;
  size: number;
}
