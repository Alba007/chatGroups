import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {GroupChat} from '../models/GroupChat';
import {Message} from 'src/Messages';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpReqService {
  //url for chat groups
  url = environment.serverUrl + '/api';

  constructor(private http: HttpClient, private dialog: MatDialog) {
  }

//merr grupet
  public getGroups(): Observable<GroupChat[]> {
    return this.http.get<GroupChat[]>(this.url + '/ChatGroups')
  }

//merr mesazhet e nje chat group
  public getMessagesByChatId(id: string): Observable<Message[]> {
    console.log(this.url + '/messages/' + id);
    return this.http.get<Message[]>(this.url + '/messages/' + id)
  }

//post nje chat group
  public saveGroup(group: GroupChat) {
    return this.http.post<any>(this.url + '/ChatGroups', group);
  }

//fshin nje chat-group
  public deleteGroup(id: string) {
    return this.http.delete<any>(this.url + '/' + id);
  }
}
