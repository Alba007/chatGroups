import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { GroupChatWSService } from 'src/groupChatWs';
//import { FilterWebSocketService } from './filter-web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  disabled = true;
 
  public stompClient:any;
 
  constructor(private groupChatWs:GroupChatWSService,private groupChatWSService:GroupChatWSService) {
  }

  private onConnect = () => {
    this.stompClient.subscribe("/topic/public", (payload) => {
      console.log('Received message', JSON.parse(payload.body));
      
  })
 this.stompClient.subscribe("/topic/create", (message) => {
   const groupInfo= JSON.parse(message.body)
   this.groupChatWSService.emitGroupChat(groupInfo);
  })

    this.stompClient.subscribe("/topic/create", (payload) => {
      console.log('Received message', JSON.parse(payload.body));
    })
}
 
  connect() {
    let socket = new SockJS("http://localhost:8080//socketMessage/");
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, this.onConnect);
  }
 
}
