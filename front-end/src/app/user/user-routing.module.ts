import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TestComponent} from "../user/test/test.component";
import {AdminComponent} from "../admin/admin.component";
import {ListAdminComponent} from "../admin/list-admin/list-admin.component";

const routes: Routes = [{
  path: 'user', component: AdminComponent,
  children: [
    {
      path: 'test', component: TestComponent
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
export class UserRoutingModule {
}
