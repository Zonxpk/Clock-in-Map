import { LocalDataSource  } from 'ng2-smart-table';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckInService } from '../../../services/check-in.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { NbWindowService } from '@nebular/theme';
import * as moment from 'moment';

interface IPaging {
  page: number;
  perPage: number;
}



@Component({
  selector: 'ngx-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  providers: [DatePipe],

})


export class ListViewComponent implements OnInit {

  selectedId = null;
  data: any;
  source: LocalDataSource;
  users: any;
  name: string;
  api: string = environment.apiEndPoint;

  sale_list: any = [];
  check_in_log: any = [];
  settings = {
    mode: 'external',
    hideSubHeader: true, // Hide filter row
    // actions: false,
    actions: {
      width: '10%',
      position: 'right',
      custom: [
        {
          name: 'location',
          title: '<i class="nb-location"></i>',
        },
        {
          name: 'info',
          title: '<i class="nb-info"></i>',
        },
      ],
      add: false,
      edit: false,
      delete: false,
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
      ci_date: {
        title: 'Date',
        type: 'text',
        width: '21%' ,
        },
      // ci_date_create: {
      //   title: 'Date',
      //   type: 'date',
      //   width: '21%' ,
      //     valuePrepareFunction: (date) => {
      //        let thai_date , temp_date = new Date(date);
      //        thai_date = temp_date.setFullYear(temp_date.getFullYear() + 543);
      //        return this.datePipe.transform(temp_date, 'd MMM yyyy HH:mm ') + 'น.';
      //     },
      //   },
      ci_subject: {
        title: 'Subject',
        width: '17%' ,
      },
      ci_detail: {
        title: 'Detail',
        type: 'html',
        width: '47%' ,
        valuePrepareFunction: (data) => {
          return '<p class="word-break">' + data + '</p>';
       },
      },
    },
  };

  @Input() loading: boolean;
  @Output() loadingChange = new EventEmitter();
  @ViewChild('contentTemplate', { static: false }) contentTemplate: TemplateRef<any>;

  constructor(
    private windowService: NbWindowService,
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

  onAction(event) {
    const location = event.data['location'];
    switch (event.action) {
      case 'location' :
        this.openLocation(location);
        break;

      case 'info' :
        const ci_data = event.data;
        // let ci_date = moment(ci_data.ci_date_create);
        // ci_date.add(543, 'years');
        // ci_date.locale('th');
          this.windowService.open(
            this.contentTemplate,
            {
              title: '',
              context: {
                subject: ci_data.ci_subject,
                detail: ci_data.ci_detail,
                date: ci_data.ci_date,
                image: this.api + '/' + ci_data.ci_img_path,
                location: location,
              },
            },
          );
        break;
    }
  }

  openLocation(location){
    const lat = location['lc_latitude'];
    const long = location['lc_longitude'];
    const url = 'https://www.google.com/maps?q=loc:' + lat + ',' + long;
    window.open(url);
  }
}
