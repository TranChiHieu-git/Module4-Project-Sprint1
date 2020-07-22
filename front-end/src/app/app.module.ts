import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminComponent} from './admin/admin.component';
import {AdminModule} from './admin/admin.module';
import {ShareModule} from './shares/share.module';
import {MaterialModule} from './shares/material.module';
import {MatIconModule} from '@angular/material/icon';
import {UserComponent} from './user/user.component';
import {UserModule} from './user/user.module';
import {EmployeeModule} from './employee/employee.module';
import {EmployeeComponent} from './employee/employee.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth-interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    EmployeeComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    EmployeeModule,
    ShareModule,
    AppRoutingModule,
    MaterialModule,
    MatIconModule,
    UserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-center-center'
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
