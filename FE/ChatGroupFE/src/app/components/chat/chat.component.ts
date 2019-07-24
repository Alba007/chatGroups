import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { WebSocketService } from '../../services/WebSocketService';
import { getDataService } from '../../services/getDataService';
import { Message,Type } from '../../models/message';
import { type } from 'os';
import { HttpReqService } from 'src/app/services/http-req-service.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  public chatGroups = [];
  public chatMessages = [];
  public chatId:string="" ;

  usernameForm: FormGroup;
  public username: string="";

  messageForm: FormGroup;
  messageToBeSent: Message={
    "context":"" ,
    "groupChatId": "",
    "sender": "",
    "time":"",
    "type":Type.CHAT
  } ;
  constructor(private socketMessage: WebSocketService, private getDataService: getDataService, private httpService: HttpReqService) {

  }

  ngOnInit() {
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });

  
    this.chatGroups = ['gr1', 'gr2', 'gr3'];
    this.chatMessages = ['msg1', 'msg2', 'msg3'];



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
     this.messageToBeSent.context = this.messageForm.getRawValue().message
     this.messageToBeSent.groupChatId=this.chatId
     var today = new Date();
     var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
     var dateTime = date + 'T' + time;
    this.messageToBeSent.sender = this.username
     this.messageToBeSent.time = dateTime
     this.messageToBeSent.type = Type.CHAT;
     console.log(this.messageToBeSent)
    this.getDataService.postMessages(this.messageToBeSent).subscribe(data=>{

   })
  }
   openChat(id, name){
     // this.sendMessage(name);
      this.chatId=id
      //behet visible chati

 }
  getData() {
    this.httpService.getGroups().subscribe(groups => {
      this.chatGroups = groups;
      this.chatGroups.forEach(group => { console.log(group.id) })
    })



  }
}
