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
  NbSpinnerModule,
  NbWindowModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { RouterModule } from '@angular/router';
import { PersonLogComponent } from './person-log.component';
import { PersonMapComponent } from './person-map/person-map.component';
import { ListViewComponent } from './list-view/list-view.component';
import localeTh from '@angular/common/locales/th';
import { NbEvaIconsModule } from '@nebular/eva-icons';

registerLocaleData(localeTh);

@NgModule({
  imports: [
    Ng2SmartTableModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpVhQiwAllg1RAFaxMWSpQruuGARy0Y1k',
    }),
    AgmJsMarkerClustererModule,
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
    NbEvaIconsModule,
    NbToastrModule,
    NbSpinnerModule,
    NbWindowModule.forChild(),
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
