import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {GroupChatWSService} from 'src/groupChatWs';
import {Injectable} from "@angular/core";
import {Subject} from 'rxjs'
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  disabled = true;
  public newMessage = new Subject<any>();
  public stompClient: any;

  constructor(private groupChatWs: GroupChatWSService, private groupChatWSService: GroupChatWSService) {
  }

  connect() {
    let socket = new SockJS(environment.serverUrl + "//socketMessage/");
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, this.onConnect);
  }

  private onConnect = () => {
    this.stompClient.subscribe("/topic/public", (payload) => {
      this.newMessage.next(JSON.parse(payload.body))
      //console.log('Received message', JSON.parse(payload.body));
    });

    this.stompClient.subscribe("/topic/create", (message) => {
      const groupInfo = JSON.parse(message.body);
      this.groupChatWSService.emitGroupChat(groupInfo);
    });
  }
}
