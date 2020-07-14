import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ListAccountComponent} from './list-account/list-account.component';
import {AccessTimesComponent} from './access-times/access-times.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from 'ngx-pagination';
// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import {FusionChartsModule} from "angular-fusioncharts";

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

@NgModule({
  declarations: [ListAccountComponent, AccessTimesComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FusionChartsModule
  ]
})
export class AdminModule {
}
