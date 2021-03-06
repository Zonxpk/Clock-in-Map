import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule, NbIconModule, NbSelectModule  } from '@nebular/theme';

import { NgxLoginComponent } from './login/login.component'; // <---
import { NgxLogoutComponent } from './logout/logout.component'; // <---
import { NgxRegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSelectModule,
    NgxAuthRoutingModule,

    NbAuthModule,
  ],
  declarations: [
    NgxLoginComponent,
    NgxLogoutComponent,
    NgxRegisterComponent,
    AuthComponent,
  ],
})
export class NgxAuthModule {
}