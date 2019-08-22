import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      us_id: {
        title: 'ID',
        type: 'number',
      },
      us_code: {
        title: 'Code',
        type: 'string',
      },
      us_role_id: {
        title: 'Role',
        type: 'number',
      },
      us_username: {
        title: 'Username',
        type: 'string',
      },
      us_password: {
        title: 'Password',
        type: 'string',
      },
    },
  };


  users : any;
  name : string;
  source: LocalDataSource = this.users;

  constructor(private http: HttpClient,private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }
  ngOnInit() {
    this.get_all_user();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  
  get_all_user(){
      this.users = this.http.get(`http://192.168.1.155:3000/product/category`);
  }

  get_name(){
    this.name = 'test';
  }

  password_decode(hash){
    const bcrypt = require('bcryptjs');
    const status = bcrypt.compareSync(this.name,hash);
    alert(status);
  }

}
