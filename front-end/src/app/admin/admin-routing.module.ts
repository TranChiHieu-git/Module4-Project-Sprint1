import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {ListAdminComponent} from "./list-admin/list-admin.component";

const routes: Routes = [{path: 'admin/list', component: ListAdminComponent}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AdminRoutingModule {
}
