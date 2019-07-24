import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class getDataService {

  url_message: string = "http://localhost:8080/api/messages" ;
  constructor(private httpClient: HttpClient) { }
  
  getMessages(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url_message);
  }
  postMessages(message:any) {
    return this.httpClient.post(`${this.url_message}`, message)
  }
}
