import {
  Component,
  OnInit,
  ViewChild,
  ElementRef, ChangeDetectorRef,
} from '@angular/core';
import { LayoutService } from '../../_metronic/core/';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ApiService} from '../../services/api.service';
import {ResultModel} from '../../models/result.model';
const pageSize = 2;


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  displayedColumns = ['id', 'deviceName', 'systemStatus', 'compromised', 'currentSystemVersion', 'appVersion', 'actions'];
  dataSource: MatTableDataSource<ResultModel>;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  pages: Array<'number'>;
  currentSelectedPage = 0;
  totalPages = 0;
  pageIndexes: Array<number> = [];

  constructor(private layout: LayoutService, private el: ElementRef,
              private apiService: ApiService, private cdr: ChangeDetectorRef) {
    this.getPage(0);
  }

  ngOnInit(): void {
  }

  getPaginationWithIndex(index: number) {
    this.getPage(index);
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

    this.apiService.getPagableResults(page, pageSize)
        .subscribe(
            (response: ResultsResponse) => {
              this.dataSource = new MatTableDataSource(response.content);
              this.totalPages = response.totalPages;
              this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
              this.currentSelectedPage = response.number;
              this.dataSource.sort = this.sort;
              this.cdr.markForCheck();

            },
            (error) => {
              console.log(error);
            }
        );
  }

  active(index: number) {
    if (this.currentSelectedPage === index ){
      return {
        active: true
      };
    }
  }

  nextClick(){
    if (this.currentSelectedPage < this.totalPages - 1){
      this.getPage(++this.currentSelectedPage);
    }
  }

  previousClick(){
    if (this.currentSelectedPage > 0){
      this.getPage(--this.currentSelectedPage);
    }
  }
}

export interface ResultsResponse {
  content: ResultModel[];
  totalPages: number;
  number: number;
  pageSize: number;
}
