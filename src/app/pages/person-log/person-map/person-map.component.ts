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
      this.markers = data; // And he have data here too!
      },
    );
  }


  randomGeo(center, radius) {
    var y0 = center.lat;
    var x0 = center.lng;
    var rd = radius / 111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    var xp = x / Math.cos(y0);

    return {
        'lc_latitude': y + y0,
        'lc_longitude': xp + x0
    };
  }

  openLocation(location){
    const lat = location['lc_latitude'];
    const long = location['lc_longitude'];
    const url = 'https://www.google.com/maps?q=loc:' + lat + ',' + long;
    window.open(url);
  }

}
