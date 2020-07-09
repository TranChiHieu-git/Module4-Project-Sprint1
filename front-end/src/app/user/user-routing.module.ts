import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from '../user/test/test.component';
import {AdminComponent} from '../admin/admin.component';

const routes: Routes = [{
  path: 'user', component: AdminComponent,
  children: [
    {path: 'test', component: TestComponent}
  ],
}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class UserRoutingModule {
}
