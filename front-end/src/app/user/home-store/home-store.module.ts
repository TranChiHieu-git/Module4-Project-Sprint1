import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStoreComponent } from './home-store.component';
import {RouterModule} from '@angular/router';
import {HomeRoutingModule} from './home-routing.module';
import { HomeCakeComponent } from './home-cake/home-cake.component';
import { HomeCandyComponent } from './home-candy/home-candy.component';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  declarations: [HomeStoreComponent, HomeCakeComponent, HomeCandyComponent, DetailComponent],
    imports: [
        CommonModule,
        RouterModule,
      HomeRoutingModule
    ]
})
export class HomeStoreModule { }
