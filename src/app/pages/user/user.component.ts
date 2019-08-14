import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users : any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.get_all_user();
  }

  get_all_user(){
    this.http.get<any>('/api/user/get_all_user').subscribe(result => {
      this.users = result;
    });
  }

}
