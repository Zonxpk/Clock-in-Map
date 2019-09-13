import { NgModule, LOCALE_ID } from '@angular/core';
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
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { PersonLogComponent } from './person-log.component';
import { PersonMapComponent } from './person-map/person-map.component';
import { ListViewComponent } from './list-view/list-view.component';
import localeTh from '@angular/common/locales/th';

registerLocaleData(localeTh);

@NgModule({
  imports: [
    Ng2SmartTableModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: '',
    }),
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
    FormsModule,
    ReactiveFormsModule,
    // PersonLogRoutingModule,
  ],
  declarations: [
    PersonLogComponent,
    PersonMapComponent,
    ListViewComponent,
  ],
  providers: [
   { provide: LOCALE_ID, useValue: 'th' },
  ]
})
export class PersonLogModule { }
