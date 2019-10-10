import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckInService } from '../../../services/check-in.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'ngx-person-map',
  templateUrl: './person-map.component.html',
  styleUrls: ['./person-map.component.scss'],
})
export class PersonMapComponent implements OnInit  {
  api: string = environment.apiEndPoint;

  lat = 1.8002;
  lng = 1.581;
  obj = {
    'lat' : 13.7894439,
    'lng' : 100.5858895,
  };
  zoom = 18;
  markers: Object;
  constructor(
    private http: HttpClient,
    private Service_CheckIn: CheckInService,
    protected activatedRoute: ActivatedRoute,
    protected route: Router,
  ) { }

  ngOnInit() {
    this.markers = [];
    // var i;
    // var temp;
    // var location;
    // for(i=0;i< 2000;i++){
    //   temp = this.randomGeo(this.obj,300000)
    //   location = {
    //     'location':temp
    //   }
    //   this.markers[i] = location;
    // }
    this.Service_CheckIn.CheckInLog$.subscribe((data) => {
      this.randomDuplicateLatLong(data);
      this.markers = data; // And he have data here too!
      },
    );
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
      // console.log('loop start');
      duplicated = false;
      lat_arr = arr.map( e => {
        if (e['location']['lc_latitude'] != null) {
          return Number(e['location']['lc_latitude']).toFixed(5);
        }else {
          return Number(13.7894439).toFixed(5);
        }
      });
      long_arr = arr.map( e => {
        if (e['location']['lc_longitude'] != null) {
          return Number(e['location']['lc_longitude']).toFixed(5);
        }else {
          return Number(100.5858895).toFixed(5);
        }
      });

      // console.log('long map:' ,long_arr);
      // console.log('lat map:' ,lat_arr);
      arr.forEach( (element , index) => {
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
    }while (duplicated == true);

  }

  openLocation(location) {
    const lat = location['lc_latitude'];
    const long = location['lc_longitude'];
    const url = 'https://www.google.com/maps?q=loc:' + lat + ',' + long;
    window.open(url);
  }


  clusterClicked(evt) {
  }

}
