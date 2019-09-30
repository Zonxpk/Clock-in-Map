import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckInService } from '../../../services/check-in.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-group-map',
  templateUrl: './group-map.component.html',
  styleUrls: ['./group-map.component.scss']
})
export class GroupMapComponent implements OnInit {
  api: string = environment.apiEndPoint;

  selectedDate: number = 0;
  selectedSubject: any = null;
  lat = 1.8002;
  lng = 1.581;
  zoom = 18;
  date_markers: any;
  constructor(
    private http: HttpClient,
    private Service_CheckIn: CheckInService,
    protected activatedRoute: ActivatedRoute,
    protected route: Router,
  ) { }

  ngOnInit() {
    this.Service_CheckIn.CheckInLog$.subscribe((data) => {
      this.date_markers = data; // And he have data here too!
      this.selectedDate = 0;
      this.get_location(0);
      },

    );
  }

  get_location(value) {
    if(this.date_markers.length != 0){
      this.selectedSubject = this.date_markers[value].subject;
    }else{
    }
  }

  changeValue(){
    this.selectedDate = this.selectedDate + 1;
  }

  openLocation(location){
    const lat = location['lc_latitude'];
    const long = location['lc_longitude'];
    const url = 'https://www.google.com/maps?q=loc:' + lat + ',' + long;
    window.open(url);
  }

}
