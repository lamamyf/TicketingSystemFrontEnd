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
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EditPathsComponent} from './editPaths/editPaths';


@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.scss'],
})
export class PathsComponent implements OnInit {
  displayedColumns = ['id', 'path', 'os', 'actions'];
  dataSource: MatTableDataSource<ResultModel>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  pages: Array<'number'>;
  dialogRef: MatDialogRef<EditPathsComponent>;

  constructor(private layout: LayoutService, private el: ElementRef,
              private apiService: ApiService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.loadResults();
  }

  ngOnInit(): void {
  }

  loadResults(): void {
    this.apiService
        .getAllPaths()
        .subscribe((results: any) => {
          this.dataSource = new MatTableDataSource(results['body']);
          this.pages = new Array(results['totalpages']);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  updatePath(row){
    this.dialogRef = this.dialog.open(EditPathsComponent, {
      disableClose: false,
      width: '550px',
    });
    this.dialogRef.componentInstance.paths = row;
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadResults();
        this.snackBar.open('تم التعديل بنجاح', '', {
          duration: 2000,
        });

      }
      this.dialogRef = null;
    });
  }
}
