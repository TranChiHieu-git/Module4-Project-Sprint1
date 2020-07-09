import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {ListAdminComponent} from "./list-admin/list-admin.component";

const routes: Routes = [{
  path: 'admin', component: AdminComponent,
  children: [
    {
      path: 'list', component: ListAdminComponent
    },
    // ví dụ
    // {
    //   path: 'bac', component: ListAdminComponent
    // }
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AdminRoutingModule {
}
