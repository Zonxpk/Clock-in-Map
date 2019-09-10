import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbCheckboxModule,
  NbDatepickerModule, 
  NbIconModule,
  NbListModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbToastrModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonLogComponent } from './person-log.component';
// import { PersonLogRoutingModule } from './person-log-routing.module';
import { ListViewComponent } from './list-view/list-view.component';

@NgModule({
  imports: [
    Ng2SmartTableModule,
    CommonModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbTabsetModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbToastrModule,
    RouterModule,
    // PersonLogRoutingModule,
  ],
  declarations: [
    PersonLogComponent,
    ListViewComponent,
  ],
})
export class PersonLogModule { }
