import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleNdComponent } from './example-nd.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShippingComponent } from './shipping/shipping.component';
import { TopBarComponent } from './top-bar/top-bar.component';

const routes: Routes = [
  {
    path: '',
    // component: ProductListComponent,
    component: ExampleNdComponent,
    children: [
      {
        path: 'product-list',
        component: ProductListComponent,
      },
      {
        path: '',
        redirectTo: 'product-list',
        pathMatch: 'full',
      },
      {
        path: 'product-details/:productId',
        component: ProductDetailsComponent,
      },
      // {
      //   path: '',
      //   redirectTo: 'product-details/:productId',
      //   pathMatch: 'full',
      // },
      {
        path: 'shipping',
        component: ShippingComponent,
      },
      // {
      //   path: '',
      //   redirectTo: 'shipping',
      //   pathMatch: 'full',
      // },
      {
        path: 'cart',
        component: CartComponent,
      },
      // {
      //   path: '',
      //   redirectTo: 'cart',
      //   pathMatch: 'full',
      // },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ExampleNdRoutingModule {
}