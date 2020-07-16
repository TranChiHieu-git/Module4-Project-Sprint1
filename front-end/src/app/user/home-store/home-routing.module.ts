import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeStoreComponent} from './home-store.component';
import {HomeCakeComponent} from './home-cake/home-cake.component';
import {HomeCandyComponent} from './home-candy/home-candy.component';
import {DetailComponent} from './detail/detail.component';

// const routes: Routes = [
//   {
//     path: 'home-store', component: HomeStoreComponent, children: [
//       {path: 'cake', component: HomeCakeComponent},
//       {path: 'candy', component: HomeCandyComponent},
//       {path: 'detail', component: DetailComponent}
//     ]
//   }
// ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // RouterModule.forRoot(routes)
  ]
})
export class HomeRoutingModule {
}
