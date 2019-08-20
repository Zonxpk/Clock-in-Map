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
  config: any;
  count : any = 0;
  per_page: number = 6;
  page: any = 1;
  collection = [];
  token: any;
  name: any;
  sub: any;
  cat: any;
  // categorySuSubscription: Subscription;


  constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    setTimeout(() => {
      localStorage.clear();
      localStorage.setItem('filter', '3');
      localStorage.setItem('name', '');
    }, 300000); // 5 min

    this.route.paramMap.subscribe(params => {
      this.cate_id = [params.get('categoryId')][0];
      this.page = 1;
      this.update();

    });

    this.config = { currentPage: this.page ,itemsPerPage: this.per_page , totalItems:this.count, };

    // this.sub = this.route.params
    // .subscribe(params => {
    //    // get id from params
    //    let categoryId = +params['categoryId'];
    //     this.cate_id = categoryId;
    //     console.log('cate_id',this.cate_id);
    //     this.get_all();
    //    // do whatever you want with id here
    //  });
   
    // this.get_count().then(value => {
    //   this.count = value;
    //   this.get_all();
    //       localStorage.setItem('filter', this.sort);
    // });
    
    this.get_all().then( res =>{
        localStorage.setItem('filter', this.sort);
        this.config = { currentPage: 1,itemsPerPage: this.per_page,totalItems:this.count, };
    });


    // this.route.queryParamMap
    // .map(params => params.get('page'))
    // .subscribe(page => this.config.currentPage = page );
    
    // ERROR : currentPage = undefined

  }

  ngOnDestroy() {
  //   this.sub.unsubscribe()
  }

  update(){
    localStorage.setItem('name', this.product);
    localStorage.setItem('filter', this.sort);
    localStorage.setItem('page', this.page);
    this.get_all().then(res => {
        (this.page == null)?this.page = 1:this.page = this.page;
        this.config = { currentPage: this.page ,itemsPerPage: this.per_page,totalItems:this.count, };
    });
  }

  test(){

  }
  // get_all() {
  //   this.product = localStorage.getItem('name');
  //   this.sort = localStorage.getItem('filter');
  //   this.page = localStorage.getItem('page');
  //   this.data = {cate_id: this.cate_id, page: this.page, perpage:this.per_page, search: this.product, sort: this.sort };
  //   this.http.post<any>('http://192.168.1.155:3000/product/search', this.data).subscribe(result => {
  //     this.da = result.data;
  //   });
  // }
  
  get_all() : any{
    this.product = localStorage.getItem('name');
    this.sort = localStorage.getItem('filter');
    this.page = localStorage.getItem('page');
  
    let promise = new Promise ((resolve,reject) => {
        this.data = {cate_id: this.cate_id, page: this.page, perpage:this.per_page, search: this.product, sort: this.sort };
        this.http.post<any>('http://192.168.1.155:3000/product/search', this.data)
        .toPromise()
        .then(result => {
            this.da = result.data;
            this.count = result.count;
            console.log('result',this.da);
            resolve();
      });
    });
    return promise;
  }

  get_count():any {
    return new Promise(resolve => {
    this.data = {cate_id: this.cate_id , perpage:0 ,page: '', search:'', sort: '' };
    this.http.post<any>('http://192.168.1.155:3000/product/search', this.data).subscribe(result => {
      resolve(result.count);
    })
  });

  }

  pageChange(newPage: number) {
    this.page = newPage;
    this.update();
    console.log('after cate_id',this.cate_id);
    if(this.cate_id != null){
      // console.log('cate is not null');
      this.router.navigate(['/pages/sale',this.cate_id], { queryParams: { page: newPage }, skipLocationChange: false });
      // this.router.navigate(['/pages/sale',this.cate_id]);
    }else{
      // console.log('cate is null');
      this.router.navigate(['/pages/sale'], { queryParams: { page: newPage }, skipLocationChange: false });
    }
  }
  get_all_cat() {
    this.http.get<any>('http://192.168.1.155:3000/product/category').subscribe(result => {
      this.cat = result;
      // console.log(result);
    });
  }
  
}
