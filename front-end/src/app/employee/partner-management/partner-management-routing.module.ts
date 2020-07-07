import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TestComponent} from "../../employee/partner-management/test/test.component";

const routes: Routes = [{path: 'employee/partner-management/test', component: TestComponent}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class PartnerManagementRoutingModule {
}
