import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ListAccountComponent} from './list-account/list-account.component';
import {AccessTimesComponent} from './access-times/access-times.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [ListAccountComponent, AccessTimesComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ]
})
export class AdminModule {
}
