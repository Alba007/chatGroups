import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';

import {Observable} from 'rxjs';
import {GroupChat} from '../models/GroupChat';
import {Message} from 'src/Messages';

@Injectable({
  providedIn: 'root'
})
export class HttpReqService {
  //changeURL
  url = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private dialog: MatDialog) {
  }

  public getGroups(): Observable<GroupChat[]> {
    return this.http.get<GroupChat[]>(this.url + '/ChatGroups')
  }

  public getMessagesByChatId(id: string): Observable<Message[]> {
    console.log(this.url + '/messages/' + id);
    return this.http.get<Message[]>(this.url + '/messages/' + id)
  }

  public saveGroup(group: GroupChat) {
    return this.http.post<any>(this.url + '/ChatGroups', group);
  }

  public deleteGroup(id: string) {
    console.log(id);
    return this.http.delete<any>(this.url + '/' + id);
  }
}
