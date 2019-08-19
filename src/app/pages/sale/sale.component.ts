import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

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
  per_page: number = 6;
  collection = [];

  constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.get_all();

    this.config = {
      currentPage: 1,
      itemsPerPage: this.per_page,
      maxSize: 5,
    };

    this.route.queryParamMap
    .map(params => params.get('page'))
    .subscribe(page => this.config.currentPage = page);




  }

  update(){
    // this.get_all();
    this.get_test();
  }

  get_all(cate_id = '', page = '' , search = '') {
    this.data = {cate_id: cate_id, page: page, search: search, sort: this.sort };
    this.http.post<any>('http://192.168.1.155:3000/product/search', this.data).subscribe(result => {
      this.da = result.data;
      // console.log(result);
    });
  }
  search(data) {
    this.data = {cate_id: '', page: '1', search: data, sort: this.sort };
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

  pageChange(newPage: number) {
		this.router.navigate(['./'], { queryParams: { page: newPage } });
	}
}
