import { NgModule } from '@angular/core';
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
import { ThemeModule } from '../../@theme/theme.module';
import { ExampleNdComponent } from './example-nd.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShippingComponent } from './shipping/shipping.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExampleNdRoutingModule } from './example-nd-routing.module';
@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
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
    ReactiveFormsModule,
    ExampleNdRoutingModule,

  ],
  declarations: [
    ExampleNdComponent,
    CartComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ShippingComponent,
    TopBarComponent,
  ],
})
export class ExampleNdModule { }
