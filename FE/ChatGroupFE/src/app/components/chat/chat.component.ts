import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {WebSocketService} from '../../services/WebSocketService';
import {getDataService} from '../../services/getDataService';
import {Message, Type} from '../../models/message';
import {HttpReqService} from 'src/app/services/http-req-service.service';
import {GroupChatWSService} from '../../../groupChatWs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddGroupComponent} from '../add-group/add-group.component';
import {GroupChat} from '../../models/GroupChat';
import { EditMessageComponent } from '../edit-message/edit-message.component';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  public chatGroups = [];
  sendDisabled:boolean=true
  public chatMessages = [];
  public chatId: string = '';
  public oldChatId = '';
  public join = false;
  public showChat = false;
  public hasOpenGroup=false;
  public activeGroup: GroupChat[] = [];
  messageTobeShownInchat: any[] = [];
  usernameForm: FormGroup;
  public username: string = '';
  //newMwssage
  res: any;
  //position of message modified
  pos: any;
  messageForm: FormGroup;
  messageToBeSent: Message = {
    'context': '',
    'groupChatId': '',
    'sender': '',
    'time': '',
    'type': Type.CHAT
  };

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
        console.log("x", x)
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
      console.log(newMessage, 'mesazhi per socket');
      let that = this;
      if (newMessage.typee == 'post') {
        var newMess = {
          id: newMessage.id,
          sender: newMessage.sender,
          context: newMessage.context,
          type: newMessage.type,
          groupChatId: newMessage.groupChatId,
          time: newMessage.time
        };
        this.messageTobeShownInchat.push(newMess);
      } else {
        //u modifikua nje mesazh
        var index = this.messageTobeShownInchat.map(function(current, index) {
          if (current.id == newMessage.id) {
            that.pos = index;
            that.res = newMessage.context;
            return index;
          }
        });
        this.notifyForEditMessage();
      }

    });
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username');
    } else {

    }
  }

  ngAfterViewInit() {
    this.getData();

  }

  saveUsername() {
    this.username = this.usernameForm.getRawValue().username;
    // localStorage.setItem('username',this.username);

  }

  sendMessage() {
    this.messageToBeSent.context = this.messageForm.getRawValue().message;
    this.messageToBeSent.groupChatId = this.chatId;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + 'T' + time;
    this.messageToBeSent.sender = this.username;
    this.messageToBeSent.time = dateTime;
    this.messageToBeSent.type = Type.CHAT;
    this.getDataService.postMessages(this.messageToBeSent).subscribe(res=>{
      this.messageForm.reset()
    }
      

    );
  }

  isGroupActive(id): boolean {
    const active = this.activeGroup.filter(x => x.id === id);
    if (!active.length) {
      return true;
    }
  }

  removeGroup(group) {
    this.showChat = false;
    this.activeGroup = this.activeGroup.filter(x => x.id !== group.id);
    this.messageToBeSent.context = this.username + ' left';
    this.messageToBeSent.groupChatId = group.id;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    // var dateTime = date + 'T' + time;
    this.messageToBeSent.sender = '';
    this.messageToBeSent.time = '';
    this.messageToBeSent.type = Type.LEAVE;
    this.getDataService.postMessages(this.messageToBeSent).subscribe();
    if (this.activeGroup.length==0) {
      this.hasOpenGroup=false; 
    }

  }

  openChat(group) {
    this.hasOpenGroup=true ;
    this.chatId=group.id
    this.showChat = true;
    if (!this.join) {
      this.activeGroup.push(group);
      console.log(this.chatId, 'new');
      console.log(this.oldChatId, 'old');
      this.messageToBeSent.context = this.username + '  joined';
      this.messageToBeSent.groupChatId = group.id;
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      this.messageToBeSent.sender = '';
      this.messageToBeSent.time = '';
      this.messageToBeSent.type = Type.JOIN;
      this.getDataService.postMessages(this.messageToBeSent).subscribe();
    }

    if (this.isGroupActive(group.id)) {
      this.activeGroup.push(group);
      console.log(this.chatId, 'new');
      console.log(this.oldChatId, 'old');
      this.messageToBeSent.context = this.username + '  joined';
      this.messageToBeSent.groupChatId = group.id;
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      this.messageToBeSent.sender = '';
      this.messageToBeSent.time = '';
      this.messageToBeSent.type = Type.JOIN;
      this.getDataService.postMessages(this.messageToBeSent).subscribe();
    }
    this.join = true;
    this.chatMessages = [];
    this.messageTobeShownInchat = [];
    this.httpService.getMessagesByChatId(group.id).subscribe(messages => {
      if (messages.length > 0) {
        this.chatMessages = messages
        console.log(messages)
        this.addMessagesIntoChat();
      }
    });
  }

  

  getData() {
    this.httpService.getGroups().subscribe(groups => {
      this.chatGroups = groups;
    });
  }

  addMessagesIntoChat() {
    this.messageTobeShownInchat = this.chatMessages.map(function(current) {
      return current;

    });
    console.log(this.messageTobeShownInchat);
  }

  addGroup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data=this.chatGroups;
    this.dialog.open(AddGroupComponent, dialogConfig).afterClosed().subscribe(res => {
    });
  }

  editMesage(message) {
    if(message.type !== 'CHAT'){
      return;
    }
    let that = this;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = message ;
    this.dialog.open(EditMessageComponent, dialogConfig).afterClosed().subscribe(res => {
      console.log(res)
      if (res != '') {
        var index = this.messageTobeShownInchat.map(function (current, index) {
          if (current.id == message.id) {
            that.pos = index;
            that.res = res;
            return index;
          }
        });
        if (res=='delete') {
          console.log("delete test")
          this.messageTobeShownInchat[this.pos].context = "DELETED";
          this.chatMessages[this.pos].context = "DELETED";
          this.chatMessages[this.pos].type = "DELETE"
          this.getDataService.updateMessages(this.chatMessages[this.pos], this.chatMessages[this.pos].id).subscribe();

        }
        else {
        this.messageTobeShownInchat[this.pos].context = this.res;
        this.chatMessages[this.pos].context = this.res;
        this.chatMessages[this.pos].type="EDIT"
        this.getDataService.updateMessages(this.chatMessages[this.pos], this.chatMessages[this.pos].id).subscribe();
      
        }
        }});
  }

  notifyForEditMessage() {

    this.messageTobeShownInchat[this.pos].context = this.res;

  }

  write(event){
    if (event.target.value==""){
              this.sendDisabled=true ;
    }
    else{
           this.sendDisabled = false ;
    }
  }
}
