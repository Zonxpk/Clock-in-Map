import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  da: any;
  product: any;
  data: any;
  sort: any = 3;
  page: any;
  config: any;
  collection = [];
  token: any;
  name: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    setTimeout(() => {
      localStorage.clear();
      localStorage.setItem('filter', '3');
    }, 300000); // 5 min
    // }, 5000);

    this.config = {
      currentPage: 1,
      itemsPerPage: 6,
      maxSize: 5,
    };

    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }

    this.get_all();
    localStorage.setItem('filter', this.sort);

  }

  update(){
    // this.get_all();
    localStorage.setItem('filter', this.sort);
    this.get_all();
  }

  get_all(cate_id = '', page = '') {
    this.sort = localStorage.getItem('filter');
    this.product = localStorage.getItem('name');
    this.data = {cate_id: cate_id, page: page, perpage: '6', search: this.product, sort: this.sort };
    this.http.post<any>('http://192.168.1.155:3000/product/search', this.data).subscribe(result => {
      this.da = result.data;
      // console.log(result);
    });
  }
  search() {
    localStorage.setItem('name', this.product);
    this.data = {cate_id: '', page: '1', perpage: '6', search: this.product, sort: this.sort };
    this.http.post<any>('http://192.168.1.155:3000/product/search', this.data).subscribe(result => {
      this.da = result.data;
      // console.log(result);
    });
  }

  get_test(){
    const temp =  {
      sort:this.sort,
      page:this.page
    }
    console.log(temp);
  }

}
