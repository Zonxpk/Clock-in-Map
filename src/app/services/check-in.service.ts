import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CheckInService {
    CheckInLog$: Observable<any>;
    private SetCheckInLog = new Subject<any>();
    api: string = environment.apiEndPoint;
    constructor(
        private _http: HttpClient,
    ) {
        this.CheckInLog$ = this.SetCheckInLog.asObservable();
    }

    CheckInLog(data){
        this.SetCheckInLog.next(data);
    }

    getSaleList(){
        return this._http.get(`${this.api}/api/check_in/sale-list`).toPromise();
    }

    getLogByPerson(obj){
        // alert(JSON.stringify(obj));
        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

        return this._http.post(`${this.api}/api/check_in/log-by-person`, JSON.stringify(obj), {
            headers: headers,
          }).toPromise();
        // return this._http.post(`${this.api}/api/check_in/log-by-person`, {"us_id":"1"}).toPromise();
    }

    getLogByDate(date){
        // alert(JSON.stringify(obj));
        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

        return this._http.post(`${this.api}/api/check_in/log-by-date`, JSON.stringify(date), {
            headers: headers,
          }).toPromise();
        // return this._http.post(`${this.api}/api/check_in/log-by-person`, {"us_id":"1"}).toPromise();
    }

}
