import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
//import { FilterWebSocketService } from './filter-web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  disabled = true;
 
  private stompClient = null;
 
  constructor() {
  }
 
  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
    }
  }
 
  connect() {
    let socket = new SockJS("http://localhost:8080//socketMessage/");
    this.stompClient = Stomp.over(socket);
  

    this.stompClient.connect({}, (frame)=> {
      this.stompClient.subscribe("/ChatGroups/create", (message) => {

        console.log("message")
        console.log(message.body)
      // this.filterWebSocketService.emitFilter(filterInfo);
    }); 
    });
  }
 
  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
 
    this.setConnected(false);
    console.log('Disconnected!');
  }
 
  
 
  
}
