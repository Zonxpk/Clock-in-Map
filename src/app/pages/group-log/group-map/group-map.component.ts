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
      data.forEach(element => this.randomDuplicateLatLong(element));
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

  randomGeo(center, radius) {
    const y0 = Number(center.latitude);
    const x0 = Number(center.longitude);
    const rd = radius / 111300; // about 111300 meters in one degree

    const u = Math.random();
    const v = Math.random();

    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    // Adjust the x-coordinate for the shrinking of the east-west distances
    const xp = x / Math.cos(y0);

    const newlat = y + y0;
    const newlon = x + x0;

    return {
        'latitude': newlat.toFixed(5),
        'longitude': newlon.toFixed(5),
    };
  }

  randomDuplicateLatLong(arr) { // verify between lat/long to separate.
    let duplicated;
    let lat_arr = [];
    let long_arr = [];
    do {
      duplicated = false;
      lat_arr = arr.logByDate.map( e => {

        if (e['location']['lc_latitude'] != null) {
          return Number(e['location']['lc_latitude']).toFixed(5);
        }else {
          return Number(13.7894439).toFixed(5);
        }
      });
      long_arr = arr.logByDate.map( e => {
        if (e['location']['lc_longitude'] != null) {
          return Number(e['location']['lc_longitude']).toFixed(5);
        }else {
          return Number(100.5858895).toFixed(5);
        }
      });

      // console.log('long map:' ,long_arr);
      // console.log('lat map:' ,lat_arr);
      arr.logByDate.forEach( (element , index) => {
        if (!element['location']['lc_latitude'] && !element['location']['lc_longitude']) {
          return;
        }
        element['location']['lc_latitude'] = Number(element['location']['lc_latitude']).toFixed(5);
        element['location']['lc_longitude'] = Number(element['location']['lc_longitude']).toFixed(5);
        const idx_lat = lat_arr.indexOf(element['location']['lc_latitude']);
        const idx_long = long_arr.indexOf(element['location']['lc_longitude']);
        if (idx_lat !== index || idx_long !== index ) {
          // console.log('(' + index + ') lat/long ' + idx_lat + '/' + idx_long);
          duplicated = true;
          const lat = element['location']['lc_latitude'];
          const long = element['location']['lc_longitude'];
          const new_value = this.randomGeo({'latitude': lat , 'longitude': long}, 12);

          element['location']['lc_latitude'] = new_value.latitude;
          element['location']['lc_longitude'] = new_value.longitude;
        }
        // console.log('subject: ' + element['ci_subject']);
        // console.log('lat/long: ' + element['location']['lc_latitude'] + '/' + element['location']['lc_longitude']);
      });
    }while (duplicated === true);

  }


}
