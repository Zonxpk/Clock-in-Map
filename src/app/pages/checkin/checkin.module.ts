import {NgModule} from '@angular/core';
import {CheckinComponent} from './checkin.component';
import {FormsModule} from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';
import { CommonModule } from '@angular/common'; 
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { 
  NbCardModule,
  NbListModule,
  NbUserModule,
  NbToggleModule,
  NbButtonModule,
  NbInputModule,
  NbIconModule,
  NbWindowService,
} from '@nebular/theme';
@NgModule({
  declarations: [
    CheckinComponent
  ],
  imports: [
    NbEvaIconsModule,
    FormsModule,
    WebcamModule,
    CommonModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbToggleModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    NbWindowService,
  ],
  providers: [],
  bootstrap: [CheckinComponent]
})
export class CheckinModule { }

