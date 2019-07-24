import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WebSocketService} from '../../services/WebSocketService';
import {getDataService} from '../../services/getDataService';
import {Message, Type} from '../../models/message';
import {HttpReqService} from 'src/app/services/http-req-service.service';
import {GroupChatWSService} from "../../../groupChatWs";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AddGroupComponent} from "../add-group/add-group.component";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  public chatGroups = [];
  public chatMessages = [];
  public chatId: string = "";

  usernameForm: FormGroup;
  public username: string = "";

  messageForm: FormGroup;
  messageToBeSent: Message = {
    "context": "",
    "groupChatId": "",
    "sender": "",
    "time": "",
    "type": Type.CHAT
  };

  constructor(private socketMessage: WebSocketService,
              private getDataService: getDataService,
              private groupChatWs:GroupChatWSService,
              private dialog: MatDialog,
              private httpService: HttpReqService) {

  }

  ngOnInit() {
    this.socketMessage.connect();
    this.groupChatWs.getMsgSubjectObservable().subscribe(x=>{
      if(x){
        console.log("x",x)
        this.chatGroups.push(x)
      }
    });
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });
    this.usernameForm = new FormGroup({
      username: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    this.getData();

  }

  saveUsername() {

    this.username = this.usernameForm.getRawValue().username;
    console.log(this.username)
  }

  sendMessage() {
    // const chatMessage = this.messageForm.getRawValue();
    // this.socketMessage.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    this.messageToBeSent.context = this.messageForm.getRawValue().message;
    this.messageToBeSent.groupChatId = this.chatId;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + 'T' + time;
    this.messageToBeSent.sender = this.username;
    this.messageToBeSent.time = dateTime;
    this.messageToBeSent.type = Type.CHAT;
    console.log(this.messageToBeSent);
    this.getDataService.postMessages(this.messageToBeSent).subscribe(data => {

    })
  }

  openChat(id, name) {
    this.chatId = id;
    this.chatMessages=[];

    this.httpService.getMessagesByChatId(id).subscribe(messages=>{
      this.chatMessages=messages
    })
  }

  getData() {
    this.httpService.getGroups().subscribe(groups => {
      this.chatGroups = groups;
    })
  }

  addGroup(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(AddGroupComponent, dialogConfig).afterClosed().subscribe(res => {
    })
  }
}
