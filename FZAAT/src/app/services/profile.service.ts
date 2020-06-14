import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map,catchError} from 'rxjs/operators';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import {Profile} from '../shared/profile'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  getProfiles(): Observable<Profile[]>{
    return this.http.get<Profile[]>(baseURL+'profile')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getProfile(staffid: string):Observable<Profile>{
      return this.http.get<Profile>(baseURL+'profile?/'+staffid)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  } 

  createProfile(profile: Profile) : Observable<Profile>{                    
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'})
      };      
    return this.http.post<Profile>(baseURL+'profile',profile,httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));                     
  }            

  updateProfile(profile: Profile) : Observable<Profile>{           
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };      
  return this.http.put<Profile>(baseURL+'profile',profile,httpOptions )
      .pipe(catchError(this.processHTTPMsgService.handleError));                     
} 
}
