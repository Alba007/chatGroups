import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';

import {Observable} from 'rxjs';
import {GroupChat} from './GroupChat';

@Injectable({
  providedIn: 'root'
})
export class HttpReqService {
  //changeURL
  url = 'http://localhost:8080/api/ChatGroups';


  constructor(private http: HttpClient, private dialog: MatDialog) {
  }

  public  getGroups():Observable<GroupChat[]>{
     return  this.http.get<GroupChat[]>(this.url);

   }

  public saveGroup(group: GroupChat) {
    return this.http.post<any>(this.url, group);
  }

  public updateGroup(group: GroupChat) {
    return this.http.put<any>(this.url + '/' + group._id, group);
  }

  public deleteGroup(id: string) {
    console.log(id)
    return this.http.delete<any>(this.url + '/' + id);
  }


}
