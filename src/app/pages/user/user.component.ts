import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users : any;
  name : string;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.get_all_user();
  }

  get_all_user(){
    var db = environment.db;
    this.http.get<any>(`${db}/api/user/get_all_user`).subscribe(result => {
      this.users = result;
    });
  }

  get_name(){
    this.name = 'test';
  }

}
