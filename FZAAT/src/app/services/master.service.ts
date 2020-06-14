import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Masters} from'../shared/masters';
import {baseURL} from '../shared/baseurl';
import {map,catchError} from 'rxjs/operators';
import {ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient,private processHTTPMsgService: ProcessHTTPMsgService
    ) { }

    getMasters(): Observable<Masters>{
      return this.http.get<Masters>(baseURL+'masters')
      .pipe(catchError(this.processHTTPMsgService.handleError));
     
    }
}
