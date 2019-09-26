import { ServerDataSource, LocalDataSource  } from 'ng2-smart-table';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SmartTableData } from '../../../@core/data/smart-table';
import { CheckInService } from '../../../services/check-in.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

interface IPaging {
  page:number;
  perPage:number;
}

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
    actions: false,
    // actions: {
    //   custom: [
    //     {
    //       name: 'Location',
    //       title: '<i class="nb-pin"></i>',
    //     },
    //   ],
    //   add: false,
    //   edit: false,
    //   delete: false,
    // },
    add: {
      addButtonContent: '<i class="nb-info" style="fill:red"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-location"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-info"></i>',
      confirmDelete: true,
    },
    columns: {
      idx: {
          title: '#',
          type: 'text',
          width: '5%' ,
            valuePrepareFunction : (value, row, cell) => {
              const paging: IPaging = this.source.getPaging();
              const ret = (paging.page - 1) * paging.perPage + cell.row.index + 1;
              return ret;
            }
        },
      ci_date_create: {
        title: 'Date',
        type: 'date',
        width: '21%' ,
          valuePrepareFunction: (date) => {
             let thai_date , temp_date = new Date(date);
             thai_date = temp_date.setFullYear(temp_date.getFullYear() + 543);
             return this.datePipe.transform(temp_date, 'd MMM yyyy HH:mm ') + 'น.';
          },
        },
      ci_subject: {
        title: 'Subject',
        width: '17%' ,
      },
      ci_detail: {
        title: 'Detail',
        width: '47%' ,
      },
      location: {
        title: 'Location',
        type: 'html',
        width: '10%' ,
          valuePrepareFunction: (location) => {
          const lat = location['lc_latitude'];
          const long = location['lc_longitude'];
          const url = 'https://www.google.com/maps?q=loc:' + lat + ',' + long;
          return  '<div> <a href="' + url + '"><nb-icon icon="pin-outline"></nb-icon></a>' +
          '<a href="' + url + '"><nb-icon icon="info-outline"></nb-icon></a> </div>';
        },
      },
    },
  };

  selectedId = null;
  data: any;
  source: LocalDataSource;
  users: any;
  name: string;
  @Input() loading: boolean;
  @Output() loadingChange = new EventEmitter();

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

  get_ci_log(value) {
    this.loading = true;
    this.loadingChange.emit(this.loading);

    this.source = new LocalDataSource;
    const body = {'us_id': value.toString() };
    this.Service_CheckIn.getLogByPerson(body).then((res) => {

      this.source.load(<any>res);
      this.Service_CheckIn.CheckInLog(res); // send data to map component

      this.loading = false;
      this.loadingChange.emit(this.loading);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }
}
