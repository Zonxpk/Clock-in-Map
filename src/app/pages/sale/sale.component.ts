import { Component, OnInit, Input ,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,ParamMap  } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit , OnDestroy  {
  da: any;
  product: any = '';
  data: any;
  sort: any = 3;
  cate_id : any;
  cate_name : any;
  config: any;
  count : any = 0;
  per_page: number = 6;
  page: any;
  collection = [];
  token: any;
  name: any;
  sub: any;
  cat: any;
  tempSub : Subscription;


  constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router) { 
    this.get_all_cat();

    route.paramMap.subscribe(params => {
      this.cate_id = [params.get('categoryId')][0];
      this.cate_name = [params.get('categoryName')][0];
      this.page = this.route.snapshot.queryParams['page'];
      this.sort = this.route.snapshot.queryParams['sort'];
      this.product = this.route.snapshot.queryParams['product'];
      this.check_param();
      this.get_all_product();
    });
  }

  ngOnInit() {
    this.config = { currentPage: this.page , itemsPerPage: this.per_page , totalItems: this.count };
    
  }

  ngOnDestroy() {
  }


  update(){
    this.check_param();
    if (this.cate_id != null) {
      // console.log('cate is not null');
      this.router.navigate(['/pages/sale', this.cate_id, this.cate_name], 
      { queryParams: { page: this.page, sort: this.sort, product: this.product },
       skipLocationChange: false });
      // this.router.navigate(['/pages/sale',this.cate_id]);
    }else{
      // console.log('cate is null');
      this.router.navigate(['/pages/sale'], 
      { queryParams: { page: this.page, sort: this.sort, product: this.product }, skipLocationChange: false });
    }
    this.get_all_product();
  }

  check_param(){
    // console.log('page before', this.page);
    // console.log('sort before', this.sort);
    (this.page == null) ? this.page = 1 : this.page = this.page;
    (this.sort == null) ? this.sort = 3 : this.sort = this.sort;
    // console.log('page after', this.page);
    // console.log('sort after', this.sort);
  }

  get_all() : any{
    let promise = new Promise ((resolve,reject) => {
        this.data = {cate_id: this.cate_id, page: this.page, perpage:this.per_page, search: this.product, sort: this.sort };
        this.http.post<any>('http://192.168.1.155:3000/product/search', this.data).subscribe(result => {
          console.log('result',result);
          resolve(result);
        });
    });
    return promise;
  }

  get_all_product(){
    this.get_all().then( res =>{
      this.da = res.data;
      this.count = res.count;
      this.config.totalItems = this.count;
  });
  }

  pageChange(newPage: number) {
    this.page = newPage;
    this.config.currentPage = this.page;
    this.update();
    console.log('after:pageChange',this.cate_id);
  }

  categoryChange(){
    this.tempSub = this.route.paramMap.subscribe(params => {
      this.cate_id = [params.get('categoryId')][0];
      this.cate_name = [params.get('categoryName')][0];
      this.check_param();
      this.config.currentPage = this.page;
      this.get_all_product();
      console.log('after:cateChange',this.cate_id);

    });
  }
  get_all_cat() {
    this.http.get<any>('http://192.168.1.155:3000/product/category').subscribe(result => {
      this.cat = result;
      // console.log(result);
    });
  }
}
