import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStoreComponent } from './home-store.component';
import {RouterModule} from '@angular/router';
import {HomeRoutingModule} from './home-routing.module';
import { HomeCakeComponent } from './home-cake/home-cake.component';
import { HomeCandyComponent } from './home-candy/home-candy.component';
import { DetailComponent } from './detail/detail.component';
import { HomeBakeryComponent } from './home-bakery/home-bakery.component';
import {Ng2OrderModule} from "ng2-order-pipe";
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [HomeStoreComponent, HomeCakeComponent, HomeCandyComponent, DetailComponent, HomeBakeryComponent],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    Ng2OrderModule,
    NgxPaginationModule
  ]
})
export class HomeStoreModule { }
