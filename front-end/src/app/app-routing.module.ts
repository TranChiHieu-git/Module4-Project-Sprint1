import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminRoutingModule} from './admin/admin-routing.module';
import {AdminComponent} from './admin/admin.component';
import {EmployeeRoutingModule} from './employee/employee-routing.module';
import {EmployeeComponent} from './employee/employee.component';
const routes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: 'employee', component: EmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminRoutingModule, EmployeeRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
