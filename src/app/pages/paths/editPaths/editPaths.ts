import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {PathsModel} from '../../../models/paths.model';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { cloneDeep } from 'lodash';
import {ApiService} from '../../../services/api.service';

@Component({
    selector: 'app-editpaths',
    templateUrl: './editPaths.html',
    styleUrls: ['./editPaths.scss'],

})
export class EditPathsComponent implements OnInit{

    public paths: PathsModel;
    formData: FormGroup;

    constructor(public dialogRef: MatDialogRef<EditPathsComponent>,
                private pathsFB: FormBuilder,
                private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.formData = this.pathsFB.group({
            os: [this.paths.os],
            paths: this.pathsFB.array(this.paths.paths.map(path => this.createPath(path))),
            id: [this.paths.id]
        });
    }

    createPath(path: any) {
             return new FormControl(path);
    }

    deletePath(index: number) {
        const clonedData = cloneDeep(this.paths.paths);
        clonedData.splice(index, 1);
        this.paths.paths = clonedData;
        this.getFormPaths().removeAt(index);

    }

    getFormPaths() {
        return this.formData.get('paths') as FormArray;
    }

    addScenario() {
        const path = '';
        const clonedData = cloneDeep(this.paths.paths);
        clonedData.push(path);
        this.getFormPaths().push(this.createPath(path));
        this.paths.paths = clonedData;

    }
    submit(){
        this.apiService
            .updatePaths(this.formData.value).pipe()
            .subscribe((data: Response) => {
                // const resStr = JSON.stringify(data);
                // const resJSON = JSON.parse(resStr);
                this.dialogRef.close(true);

            });


    }
}
