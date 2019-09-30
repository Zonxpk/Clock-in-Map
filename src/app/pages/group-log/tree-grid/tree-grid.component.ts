import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbGetters } from '@nebular/theme';
import { FormControl } from '@angular/forms';
import { CheckInService } from '../../../services/check-in.service';
const moment = require('moment');


interface FSEntry {
  subject: string;
  count?: number;
  fk_date?: Date;
  ci_id?: number;
  detail?: string;
  date?: Date;
  status?: string;
  us_id?: number;
  us_code?: string;
  role?: string;
  expanded?: boolean;
  logByDate?: FSEntry[];
}


@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss'],
})
export class TreeGridComponent implements OnInit {

  @Input() loading: boolean;
  @Output() loadingChange = new EventEmitter();
  customColumn = 'subject';
  defaultColumns = [ 'detail', 'name'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  ngModelDate: Date;
  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  getters: NbGetters<FSEntry, FSEntry> = {
    dataGetter: (node: FSEntry) => node,
    childrenGetter: (node: FSEntry) => node.logByDate || undefined,
    expandedGetter: (node: FSEntry) => !!node.expanded,
  };

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private Service_CheckIn: CheckInService,
    ) {
    // this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  ngOnInit(){
    const value = {
      start : moment(),
      end : moment().add(1, 'days'),
    };
    this.ngModelDate = new Date();
    this.Service_CheckIn.getLogByDate(value).then((res) => {
      const temp = res as FSEntry[];
      this.dataSource = this.dataSourceBuilder.create(temp, this.getters);
      this.Service_CheckIn.CheckInLog(res); // send data to map component
    });
  }
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  get_ci_log(value) {
    if(value.end) {
      value = {
        start : moment.parseZone(value.start).format(),
        end : moment.parseZone(value.end).add(1, 'days').format(),
      };
      this.loading = true;
      this.loadingChange.emit(this.loading);

      this.Service_CheckIn.getLogByDate(value).then((res) => {
        const temp = res as FSEntry[];
        this.dataSource = this.dataSourceBuilder.create(temp, this.getters);

        this.Service_CheckIn.CheckInLog(res); // send data to map component

        this.loading = false;
        this.loadingChange.emit(this.loading);
      });
    }
  }


  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

}
