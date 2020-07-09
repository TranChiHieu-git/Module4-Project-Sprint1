import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from '../user/test/test.component';
import {AdminComponent} from '../admin/admin.component';
import {UserManageComponent} from './user-manage/user-manage.component';
import {UserOdersComponent} from './user-oders/user-oders.component';
import {UserOderDetailComponent} from './user-oder-detail/user-oder-detail.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

const routes: Routes = [{
  path: 'user', component: AdminComponent,
  children: [
    {path: 'test', component: TestComponent}
  ],
},
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
