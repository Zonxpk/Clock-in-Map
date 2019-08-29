import {NgModule} from '@angular/core';
import {CheckinComponent} from './checkin.component';
import {FormsModule} from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';
import { CommonModule } from '@angular/common'; 
import { 
  NbCardModule,
  NbListModule,
  NbUserModule,
  NbButtonModule,
  NbInputModule,
} from '@nebular/theme';
@NgModule({
  declarations: [
    CheckinComponent
  ],
  imports: [
    FormsModule,
    WebcamModule,
    CommonModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbButtonModule,
    NbInputModule,
  ],
  providers: [],
  bootstrap: [CheckinComponent]
})
export class CheckinModule { }
