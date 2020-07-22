import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from './test/test.component';
import {UserComponent} from './user.component';
import {UserManageComponent} from './user-manage/user-manage.component';
import {UserOdersComponent} from './user-oders/user-oders.component';
import {UserOderDetailComponent} from './user-oder-detail/user-oder-detail.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {HomeStoreComponent} from './home-store/home-store.component';
import {HomeCakeComponent} from './home-store/home-cake/home-cake.component';
import {HomeCandyComponent} from './home-store/home-candy/home-candy.component';
import {DetailComponent} from './home-store/detail/detail.component';
import {OrderButtonComponent} from './orderButton/orderButton.component';
import {UserLoginComponent} from './user-login/user-login.component';

const routes: Routes = [{
  path: '', component: UserComponent,
  children: [
    {path: 'test', component: TestComponent},
    {path: 'login', component: UserLoginComponent},
    {
      path: 'user-manage', component: UserManageComponent,
      children: [
        {
          path: 'user-detail', component: UserDetailComponent,
        },
        {
          path: 'user-oder', component: UserOdersComponent
        },
        {
          path: 'user-oder/:id', component: UserOderDetailComponent
        }
      ]
    },
  ],
},
  {
    path: 'home', component: UserComponent,
  },
  {

    path: '', component: UserComponent,
    children: [
      {path: '', component: OrderButtonComponent}
      ,
      {
        path: 'home-store', component: HomeStoreComponent,
        children: [
          {path: 'cake', component: HomeCakeComponent},
          {path: 'candy', component: HomeCandyComponent},
          {path: 'detail', component: DetailComponent}
        ]
      },
      {
        path: 'user-manage',
        component: UserManageComponent,
        children: [{
          path: 'user-detail',
          component: UserDetailComponent,
        },
          {
            path: 'user-order',
            component: UserOdersComponent
          },
          {
            path: 'order-detail/:idOrder',
            component: UserOderDetailComponent
          }
        ]
      },
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
