import { NgModule } from '@angular/core';
import { 
  NbCardModule,
  NbListModule,
  NbUserModule,
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
    FormsModule,
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
