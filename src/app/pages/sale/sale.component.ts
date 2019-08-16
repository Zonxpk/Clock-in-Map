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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.get_all();

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

}
