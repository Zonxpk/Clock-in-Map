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
import { ExampleNdModule } from './example-nd/example-nd.module';
import { PersonLogModule } from './person-log/person-log.module';
import { GroupLogModule } from './group-log/group-log.module';
import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  imports: [
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
    PersonLogModule,
    GroupLogModule,
    PagesRoutingModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
