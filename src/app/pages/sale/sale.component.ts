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
  product: any;
  data: any;
  sort: any = '';
  page: any;
  cate_id : any;
  config: any;
  count : any = 0;
  per_page: number = 6;
  collection = [];
  token: any;
  name: any;
  sub: any;
  // categorySuSubscription: Subscription;


  constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      localStorage.clear();
      localStorage.setItem('filter', '3');
    }, 300000); // 5 min

    this.route.paramMap.subscribe(params => {
      this.cate_id = [params.get('categoryId')][0];
      console.log('before cate_id',this.cate_id);
      this.get_all();

    });


    // this.sub = this.route.params
    // .subscribe(params => {
    //    // get id from params
    //    let categoryId = +params['categoryId'];
    //     this.cate_id = categoryId;
    //     console.log('cate_id',this.cate_id);
    //     this.get_all();
    //    // do whatever you want with id here
    //  });
   
    this.get_count().then(value => {
      this.count = value;
      this.get_all();
    });

    this.config = {
      currentPage: 1,
      itemsPerPage: this.per_page,
    };

    this.route.queryParamMap
    .map(params => params.get('page'))
    .subscribe(page => this.config.currentPage = page);

    
  }

  ngOnDestroy() {
  //   this.sub.unsubscribe()
  }

  update(){
    // this.get_all();
    localStorage.setItem('filter', this.sort);
    this.get_all();
  }

  get_all(page = '') {
    this.sort = localStorage.getItem('filter');
    this.product = localStorage.getItem('name');
    this.data = {cate_id: this.cate_id, page: page, perpage:this.count, search: this.product, sort: this.sort };
    this.http.post<any>('http://192.168.1.155:3000/product/search', this.data).subscribe(result => {
      this.da = result.data;
    });
  }

  get_count():any {
    return new Promise(resolve => {
    this.data = {cate_id: '', perpage:0 ,page: '', search:'', sort: this.sort };
    this.http.post<any>('http://192.168.1.155:3000/product/search', this.data).subscribe(result => {
      resolve(result.count);
    })
  });

  }

  get_all(cate_id = '', page = '' , search = '') {
    console.log('Z',this.count);
    this.data = {cate_id: cate_id, perpage:this.count ,page: page, search: search, sort: this.sort };
    this.http.post<any>('http://192.168.1.155:3000/product/search', this.data).subscribe(result => {
      this.da = result.data;
      console.log(result);
    });
  }
  search(data) {
    this.data = {cate_id: '', page: '1', search: data, sort: this.sort };
    this.http.post<any>('http://192.168.1.155:3000/product/search', this.data).subscribe(result => {
      this.da = result.data;
      // console.log(result);
    });
  }


  pageChange(newPage: number) {
    // alert(this.router.url);
    console.log('after cate_id',this.cate_id);
    if(this.cate_id != null){
      // console.log('cate is not null');
      this.router.navigate(['/pages/sale',this.cate_id], { queryParams: { page: newPage }, skipLocationChange: true });
      // this.router.navigate(['/pages/sale',this.cate_id]);
    }else{
      // console.log('cate is null');
      this.router.navigate(['/pages/sale'], { queryParams: { page: newPage }, skipLocationChange: true });
    }
	}

}
