import { ServerDataSource, LocalDataSource  } from 'ng2-smart-table'; 
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SmartTableData } from '../../../@core/data/smart-table';
import { CheckInService } from '../../../services/check-in.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  providers: [DatePipe],
})
export class ListViewComponent implements OnInit {
  sale_list: any = [];
  settings = {
    hideSubHeader: true, // Hide filter row
    actions: false, // Hide actions column
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
      idx: {
        title: '#',
        filter: false,
        valuePrepareFunction( value, row, cell) { return (cell.row.index) + 1; },
      },
      ci_date_create: {
        title: 'Date',
        type: 'date',
          valuePrepareFunction: (date) => {
             let thai_date , temp_date = new Date(date);
             thai_date = temp_date.setFullYear(temp_date.getFullYear() + 543);
             return this.datePipe.transform(temp_date, 'd MMM yyyy HH:mm ') + 'น.';
          },
        },
      ci_subject: {
        title: 'Subject',
      },
      location: {
        title: 'Location',
        type: 'html',
        valuePrepareFunction:(location)=>{
          const lat = location['lc_latitude'];
          const long = location['lc_longitude'];
          const url = 'https://www.google.com/maps?q=loc:' + lat + ',' + long;
          return  '<a href="' + url + '">lat:' + lat + ' ,long:' + long + ' </a>';
        },
      },
      // location: {
      //   title: 'Latitude',
      // },
    },
  };

  // data = [
  //   {
  //     id: 1,
  //     date: '2019-09-09 15:12:16',
  //     subject: 'สัมมนา',
  //     location: 'Ketshop',
  //   },
  // ];
  selectedId = null;
  data: any;
  // source: ServerDataSource;
  source: LocalDataSource;
  users: any;
  name: string;
  // source: LocalDataSource = this.users;

  constructor(
    private http: HttpClient,
    private Service_CheckIn: CheckInService,
    protected activatedRoute: ActivatedRoute,
    protected route: Router,
    private datePipe: DatePipe,
    ) { }

   async ngOnInit() {
    this.sale_list = await this.Service_CheckIn.getSaleList();
  }

  query_ci_log(){
    const temp = {'us_id': this.selectedId.toString()};
    this.source = new LocalDataSource;
    this.Service_CheckIn.getLogByPerson(temp).then((res) => {
      console.log(res);
      this.source.load(res['data']);
      this.Service_CheckIn.CheckInLog(res['data']);
    });
    // this.source = new LocalDataSource(<any> temp_source);
    // console.log(temp_source);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  
  password_decode(hash) {
    const bcrypt = require('bcryptjs');
    const status = bcrypt.compareSync(this.name, hash);
    alert(status);
  }

}
