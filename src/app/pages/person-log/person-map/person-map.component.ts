import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckInService } from '../../../services/check-in.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'ngx-person-map',
  templateUrl: './person-map.component.html',
  styleUrls: ['./person-map.component.scss']
})
export class PersonMapComponent implements OnInit  {
  api: string = environment.apiEndPoint;

  lat = 1.8002;
  lng = 1.581;
  obj = {
    'lat' : 13.7894439,
    'lng' : 100.5858895
  }
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
    var y0 = Number(center.latitude);
    var x0 = Number(center.longitude);
    var rd = radius / 111300; //about 111300 meters in one degree

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    //Adjust the x-coordinate for the shrinking of the east-west distances
    var xp = x / Math.cos(y0);

    var newlat = y + y0;
    var newlon = x + x0;

    return {
        'latitude': newlat.toFixed(5),
        'longitude': newlon.toFixed(5),
    };
  }

  randomDuplicateLatLong(arr) { // verify between lat/long to separate.
    let duplicated;
    let lat_arr = [];
    let long_arr = [];
    do{
      duplicated = false;
      lat_arr = arr.map( e => Number(e['location']['lc_latitude']).toFixed(5));
      long_arr = arr.map( e => Number(e['location']['lc_longitude']).toFixed(5));

      arr.forEach( (element , index) => {
        if(!element['location']['lc_latitude'] && !element['location']['lc_longitude']){
          return;
        }
        element['location']['lc_latitude'] = Number(element['location']['lc_latitude']).toFixed(5);
        element['location']['lc_longitude'] = Number(element['location']['lc_longitude']).toFixed(5);
        let idx_lat = lat_arr.indexOf(element['location']['lc_latitude']);
        let idx_long = long_arr.indexOf(element['location']['lc_longitude']);
        if (idx_lat !== index || idx_long !== index ){
          // console.log('(' + index + ') lat/long ' + idx_lat + '/' + idx_long);
          duplicated = true;
          const lat = element['location']['lc_latitude'];
          const long = element['location']['lc_longitude'];
          const new_value = this.randomGeo({'latitude': lat , 'longitude': long}, 15);

          element['location']['lc_latitude'] = new_value.latitude;
          element['location']['lc_longitude'] = new_value.longitude;
        }
        console.log('subject: ' + element['ci_subject']);
        console.log('lat/long: ' + element['location']['lc_latitude'] + '/' + element['location']['lc_longitude']);
      });
    }while (duplicated == true);

  }

  openLocation(location){
    const lat = location['lc_latitude'];
    const long = location['lc_longitude'];
    const url = 'https://www.google.com/maps?q=loc:' + lat + ',' + long;
    window.open(url);
  }


  clusterClicked(evt) {
    console.log("clusterClick:", evt);

    // console.log('total markers',evt.getTotalMarkers());
    // evt.getMarkers().forEach(element => {
    //   console.log('element',element);
    // });
  }

}
