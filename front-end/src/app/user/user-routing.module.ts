import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from '../user/test/test.component';
import {UserComponent} from './user.component';
import {UserManageComponent} from './user-manage/user-manage.component';
import {UserOdersComponent} from './user-oders/user-oders.component';
import {UserOderDetailComponent} from './user-oder-detail/user-oder-detail.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path: 'user-manage',
    component: UserManageComponent,
    children: [{
      path: 'user-detail',
      component: UserDetailComponent,
    },
      {
        path: 'user-oder',
        component: UserOdersComponent
      },
      {
        path: 'user-oder/:id',
        component: UserOderDetailComponent
      }
    ]
  },
  {
    path: '', component: UserComponent,
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
