import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListAdminComponent} from './list-admin/list-admin.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [ListAdminComponent],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class AdminModule {
}
