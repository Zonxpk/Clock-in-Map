import { NgModule } from '@angular/core';
import { 
  NbCardModule,
  NbListModule,
  NbUserModule,
  NbButtonModule,
  NbInputModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
    Ng2SmartTableModule,
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbUserModule,
    NbListModule,   
    ThemeModule,
  ],
  declarations: [
    UserComponent,
  ],
})
export class UserModule { }
