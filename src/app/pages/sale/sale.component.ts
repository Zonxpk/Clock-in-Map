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
  sort: any = '';
  page: any;
  config: any;
  collection = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.config = {
      currentPage: 1,
      itemsPerPage: 6,
      maxSize: 5,
    };

    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }

    this.get_all();


  }

  update(){
    // this.get_all();
    this.get_test();
  }

  get_all(cate_id = '', page = '' , search = '') {
    this.data = {cate_id: cate_id, page: page, perpage: '6', search: search, sort: this.sort };
    this.http.post<any>('http://192.168.1.155:3000/product/search', this.data).subscribe(result => {
      this.da = result.data;
      // console.log(result);
    });
  }
  search(data) {
    this.data = {cate_id: '', page: '1', perpage: '6', search: data, sort: this.sort };
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
