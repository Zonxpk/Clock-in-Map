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
  NbTreeGridModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { RouterModule } from '@angular/router';
import { GroupLogComponent } from './group-log.component';
import { GroupMapComponent } from './group-map/group-map.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
import { TreeGridIconComponent } from './tree-grid/tree-grid-icon/tree-grid-icon.component';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { format } from 'date-fns';
import * as th from 'date-fns/locale/th';
import localeTh from '@angular/common/locales/th';

registerLocaleData(localeTh);

@NgModule({
  imports: [
    Ng2SmartTableModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: '',
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
    NbToastrModule,
    NbSpinnerModule,
    NbTreeGridModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // NbDateFnsDateModule.forRoot({
    //   parseOptions: { locale: th },
    //   formatOptions: { locale: th },
    // }),
    // GroupLogRoutingModule,
  ],
  declarations: [
    GroupLogComponent,
    GroupMapComponent,
    TreeGridComponent,
    TreeGridIconComponent,
  ],
  providers: [
   { provide: LOCALE_ID, useValue: 'th' },
  ]
})
export class GroupLogModule { }
