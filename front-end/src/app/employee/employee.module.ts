import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeRoutingModule} from './employee-routing.module';
import {RouterModule} from '@angular/router';
import {PartnerManagementComponent} from './partner-management/partner-management.component';
import {WarehouseManagementComponent} from './warehouse-management/warehouse-management.component';
import { HomeComponent } from './warehouse-management/home/home.component';
import {BillComponent} from './warehouse-management/bill/bill.component';
import {ListBillComponent} from './warehouse-management/bill/list-bill/list-bill.component';
import {SearchBillComponent} from './warehouse-management/bill/search-bill/search-bill.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './warehouse-management/product/product.component';
import {MaterialModule} from '../shares/material.module';
import { EmployeeDetailComponent } from './employee-manager/employee-detail/employee-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ShareModule} from '../shares/share.module';
import { EmployeeManagerComponent } from './employee-manager/employee-manager.component';
import { ListDistributorComponent } from './partner-management/list-distributor/list-distributor.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {CustomerManagementComponent} from './partner-management/customer-management/customer-management.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BrandManagementComponent} from './warehouse-management/brand-management/brand-management.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';

@NgModule({
    declarations: [PartnerManagementComponent, EmployeeDetailComponent, EmployeeManagerComponent,
  WarehouseManagementComponent, HomeComponent, ProductComponent, ListDistributorComponent, BillComponent,
    ListBillComponent,BrandManagementComponent,
    SearchBillComponent, CustomerManagementComponent],
  exports: [
    WarehouseManagementComponent,
    PartnerManagementComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    HttpClientModule,
    NgbModule,
    MaterialModule,
    MatDialogModule,
    ShareModule,
    MatCardModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAaM73RTFi8O1GV64-MyfCYdilq1atKWso',
      authDomain: 'module4-ef369.firebaseapp.com',
      DatabaseURL: 'https://module4-ef369.firebaseio.com',
      projectId: 'module4-ef369',
      storageBucket: 'module4-ef369.appspot.com',
      messagingSenderId: '182695859067',
      appId: '1: 182695859067: web: b15282dd2b619582a323de',
      measurementId: 'G-H8Y4QN69YE'
    }),
    AngularFireStorageModule,
    NgxPaginationModule,
    MatPaginatorModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})
export class EmployeeModule {
}
