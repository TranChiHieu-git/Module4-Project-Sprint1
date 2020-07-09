import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from '../user/test/test.component';
import {UserComponent} from './user.component';

const routes: Routes = [{
  path: 'home', component: UserComponent,
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
