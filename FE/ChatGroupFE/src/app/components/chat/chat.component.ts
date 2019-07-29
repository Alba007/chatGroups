import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { WebSocketService } from '../../services/WebSocketService';
import { getDataService } from '../../services/getDataService';
import { Message, Type } from '../../models/message';
import { HttpReqService } from 'src/app/services/http-req-service.service';
import { GroupChatWSService } from "../../../groupChatWs";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddGroupComponent } from "../add-group/add-group.component";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  public chatGroups = [];
  public chatMessages = [];
  public chatId: string = "";
  messageTobeShownInchat: any[] = []
  usernameForm: FormGroup;
  public username: string = "";
  //newMwssage
  res: any
  //position of message modified
  pos: any
  messageForm: FormGroup;
  messageToBeSent: Message ={
    "sender": "",
    "context": "",
    "type": Type.CHAT,
    "time": "",
    "groupChatId": "",
    "image": ""
  }
  file: any = File;
  constructor(private socketMessage: WebSocketService,
    private getDataService: getDataService,
    private groupChatWs: GroupChatWSService,
    private dialog: MatDialog,
    private httpService: HttpReqService) {
  }

  ngOnInit() {
    this.socketMessage.connect();
    this.groupChatWs.getMsgSubjectObservable().subscribe(x => {
      if (x) {
        this.chatGroups.push(x)
      }
    });
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });

    this.usernameForm = new FormGroup({
      username: new FormControl(''),
    });
    this.socketMessage.newMessage.subscribe(newMessage => {
      //erdhi nje mesazh i ri nga nje chatues tjeter prandaj shtohet ne array
      let that = this
      if (newMessage.typee == "post") {
        var newMess = {
          id: newMessage.id,
          sender: newMessage.sender,
          context: newMessage.context,
          type: newMessage.type,
          groupChatId: newMessage.groupChatId,
          time: newMessage.time
        }
        this.messageTobeShownInchat.push(newMess)
      }
      else {
        //u modifikua nje mesazh 
        var index = this.messageTobeShownInchat.map(function (current, index) {
          if (current.id == newMessage.id) {
            that.pos = index;
            that.res = newMessage.context
            return index
          }
        })
        this.notifyForEditMessage()
      }

    })
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username')
    }
  }

  ngAfterViewInit() {
    this.getData();

  }

  saveUsername() {
    this.username = this.usernameForm.getRawValue().username;
    localStorage.setItem('username', this.username);

  }

  sendMessage() {
    this.messageToBeSent.context = this.messageForm.getRawValue().message;
    this.messageToBeSent.groupChatId = this.chatId;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + 'T' + time;
    this.messageToBeSent.sender = this.username;
    this.messageToBeSent.time = dateTime;
    this.messageToBeSent.type = Type.CHAT;
    
    let formData = new FormData();
   // formData.append('message', JSON.stringify(this.messageToBeSent))
    formData.append('file', this.file);
    console.log(formData)
    this.messageToBeSent.image = this.file
    this.getDataService.postMessages(this.messageToBeSent).subscribe(data => {
      this.messageForm.reset();
    });
  }
  
  openChat(group) {
    this.chatId = group.id;
    this.chatMessages = [];
    this.messageTobeShownInchat = []
    this.httpService.getMessagesByChatId(this.chatId).subscribe(messages => {
      if (messages.length > 0) {
        this.chatMessages = messages
        //therritet metoda qe shton mesaZhet ne chat
        this.addMessagesIntoChat();
      }
    })
  }

  getData() {
    this.httpService.getGroups().subscribe(groups => {
      this.chatGroups = groups;
    })
  }

  addMessagesIntoChat() {
    this.messageTobeShownInchat = this.chatMessages.map(function (current) {
      return current
    })
  }
  addGroup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.data = this.chatGroups
    this.dialog.open(AddGroupComponent, dialogConfig).afterClosed().subscribe(res => {
    })
  }
  editMesage(message) {
    let that = this
    this.getDataService.openConfirmDialog().afterClosed().subscribe(res => {
      if (res) {
        var index = this.messageTobeShownInchat.map(function (current, index) {
          if (current.id == message.id) {
            that.pos = index;
            that.res = res
            return index
          }
        })
        this.messageTobeShownInchat[this.pos].context = this.res
        this.chatMessages[this.pos].context = this.res
        this.getDataService.updateMessages(this.chatMessages[this.pos], this.chatMessages[this.pos].id).subscribe();
      }
    }
    )
  }
  notifyForEditMessage() {
    this.messageTobeShownInchat[this.pos].context = this.res
  }

  onFileSelected(event) {
    this.file = event.target.files[0]
    console.log(event)
  }

  updloadImage() {
  }
}
