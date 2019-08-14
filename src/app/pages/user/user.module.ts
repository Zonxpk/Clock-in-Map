import { NgModule } from '@angular/core';
import { 
  NbCardModule,
  NbListModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
    NbCardModule,
    NbUserModule,
    NbListModule,   
    ThemeModule,
  ],
  declarations: [
    UserComponent,
  ],
})
export class UserModule { }
