import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, 
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { SaleModule } from './sale/sale.module';
import { CheckinModule } from './checkin/checkin.module';
<<<<<<< HEAD
=======
import { ExampleModule } from './example/example.module';
import { ExampleNdModule } from './example-nd/example-nd.module';
>>>>>>> ce60ce6f577d916d308691b95029189391f2d9f1
import { PagesRoutingModule } from './pages-routing.module';
import { WebcamModule } from 'ngx-webcam';


@NgModule({
  imports: [
    WebcamModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule, 
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    UserModule,
    SaleModule,
    CheckinModule,
    PagesRoutingModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
