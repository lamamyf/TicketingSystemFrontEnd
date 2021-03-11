import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditUserComponent } from './editUser.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgApexchartsModule} from 'ng-apexcharts';
import {HttpClientModule} from '@angular/common/http';
import {CRUDTableModule} from '../../../_metronic/shared/crud-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {WidgetsModule} from '../../../_metronic/partials/content/widgets/widgets.module';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [EditUserComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: EditUserComponent,
            },
        ]),
        InlineSVGModule,
        NgApexchartsModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        InlineSVGModule,
        NgbTooltipModule,
        WidgetsModule,
        MatInputModule,
        MatIconModule,
        MatSlideToggleModule
    ],
})
export class EditUserModule {}
