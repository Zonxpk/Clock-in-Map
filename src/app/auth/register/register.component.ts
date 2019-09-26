import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NbRegisterComponent, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class NgxRegisterComponent extends NbRegisterComponent {
  // constructor(service: NbAuthService, options: {}, cd: ChangeDetectorRef, router: Router){
  //   super(service, options, cd, router);
  //   this.user.role = 1;
  // }
}