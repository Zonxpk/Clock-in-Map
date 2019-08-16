import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './sale.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import {FormsModule} from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbListModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbToastrModule,
} from '@nebular/theme';
import { from } from 'rxjs';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule, NbIconModule,
    NbListModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbToastrModule,
    FormsModule,
  ],
  declarations: [SaleComponent]
})
export class SaleModule { }
