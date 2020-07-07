import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminComponent} from './admin/admin.component';
import {AdminModule} from "./admin/admin.module";
import {ShareModule} from "./shares/share.module";
import {MaterialModule} from "./shares/material.module";
import {MatIconModule} from "@angular/material/icon";
import {WarehouseManagementComponent} from './employee/warehouse-management/warehouse-management.component';
import {PartnerManagementComponent} from './employee/partner-management/partner-management.component';
import {UserComponent} from './user/user.component';
import {UserModule} from "./user/user.module";
import {PartnerManagementModule} from "./employee/partner-management/partner-management.module";
import {WarehouseManagementModule} from "./employee/warehouse-management/warehouse-management.module";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    WarehouseManagementComponent,
    PartnerManagementComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    ShareModule,
    MaterialModule,
    MatIconModule,
    UserModule,
    PartnerManagementModule,
    WarehouseManagementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
