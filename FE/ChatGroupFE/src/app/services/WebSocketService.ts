import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {GroupChatWSService} from 'src/groupChatWs';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  disabled = true;

  public stompClient: any;

  constructor(private groupChatWs: GroupChatWSService, private groupChatWSService: GroupChatWSService) {
  }

  private onConnect = () => {
    this.stompClient.subscribe("/topic/public", (payload) => {
      console.log('Received message', JSON.parse(payload.body));
    });

    this.stompClient.subscribe("/topic/create", (message) => {
      const groupInfo = JSON.parse(message.body);
      console.log(groupInfo)
      this.groupChatWSService.emitGroupChat(groupInfo);
    });
  };

  connect() {
    let socket = new SockJS("http://localhost:8080//socketMessage/");
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, this.onConnect);
  }
}
