import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url: String = "localhost:8080/api/messages" ;
  constructor() { }
}
