import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';

import { products } from '../products';
import { CartService } from '../cart.service';
import { ToasterConfig } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product;

  constructor(
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.product = products[params.get('productId')];
    });
  }

  addToCart(product) {
    // window.alert('Your product has been added to the cart!');
    const status = 'success';
    this.toastrService.show(`Your product has been added to the cart!`,'Test',{status});
    this.cartService.addToCart(product);

  }

}