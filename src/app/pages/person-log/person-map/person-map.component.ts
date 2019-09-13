import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckInService } from '../../../services/check-in.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-person-map',
  templateUrl: './person-map.component.html',
  styleUrls: ['./person-map.component.scss']
})
export class PersonMapComponent implements OnInit {
  lat = 13.8002;
  lng = 100.581;  
  zoom = 18;
  markers: any;
  constructor(
    private http: HttpClient,
    private Service_CheckIn: CheckInService,
    protected activatedRoute: ActivatedRoute,
    protected route: Router,
  ) { }

  ngOnInit() {
    this.Service_CheckIn.CheckInLog$.subscribe((data) => {
      this.markers = data; // And he have data here too!
      console.log('map marks',this.markers);
      },
    );
  }

}
