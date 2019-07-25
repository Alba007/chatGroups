import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {EditMessageComponent} from '../components/edit-message/edit-message.component';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class getDataService {

  url_message: string = environment.serverUrl + "/api/messages";

  constructor(private httpClient: HttpClient, private dialog: MatDialog) {
  }

  getMessages(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url_message);
  }

  postMessages(message: any) {
    return this.httpClient.post(`${this.url_message}`, message)
  }
  updateMessages(message: any,id){
    console.log(message)
      return this.httpClient.put(`${this.url_message}/${id}`, message)

  }

  openConfirmDialog() {
    return this.dialog.open(EditMessageComponent, {
      width: '300px',
      disableClose: true,

    })
  }

}
