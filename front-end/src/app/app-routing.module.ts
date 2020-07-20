import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminRoutingModule} from './admin/admin-routing.module';
import {AdminComponent} from './admin/admin.component';
import {EmployeeRoutingModule} from './employee/employee-routing.module';
import {EmployeeComponent} from './employee/employee.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {UserComponent} from './user/user.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path: 'home', component: UserComponent},
  {path: '', component: UserComponent},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminRoutingModule, EmployeeRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
