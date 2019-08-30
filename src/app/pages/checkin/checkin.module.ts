import {NgModule} from '@angular/core';
import {CheckinComponent} from './checkin.component';
import {FormsModule} from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';
import { CommonModule } from '@angular/common'; 
<<<<<<< HEAD
import { NbEvaIconsModule } from '@nebular/eva-icons';
=======
>>>>>>> ce60ce6f577d916d308691b95029189391f2d9f1
import { 
  NbCardModule,
  NbListModule,
  NbUserModule,
<<<<<<< HEAD
  NbToggleModule,
  NbButtonModule,
  NbInputModule,
  NbIconModule,
  NbWindowService,
=======
  NbButtonModule,
  NbInputModule,
>>>>>>> ce60ce6f577d916d308691b95029189391f2d9f1
} from '@nebular/theme';
@NgModule({
  declarations: [
    CheckinComponent
  ],
  imports: [
<<<<<<< HEAD
    NbEvaIconsModule,
=======
>>>>>>> ce60ce6f577d916d308691b95029189391f2d9f1
    FormsModule,
    WebcamModule,
    CommonModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
<<<<<<< HEAD
    NbToggleModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    NbWindowService,
=======
    NbButtonModule,
    NbInputModule,
>>>>>>> ce60ce6f577d916d308691b95029189391f2d9f1
  ],
  providers: [],
  bootstrap: [CheckinComponent]
})
export class CheckinModule { }
<<<<<<< HEAD

=======
>>>>>>> ce60ce6f577d916d308691b95029189391f2d9f1
