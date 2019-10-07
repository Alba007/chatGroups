import {AfterViewInit, Component, OnInit, ViewChild, AfterViewChecked, TemplateRef, ElementRef} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {WebSocketService} from '../../services/WebSocketService';
import {getDataService} from '../../services/getDataService';
import {Message, Type} from '../../models/message';
import {HttpReqService} from 'src/app/services/http-req-service.service';
import {GroupChatWSService} from '../../../groupChatWs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddGroupComponent} from '../add-group/add-group.component';
import {GroupChat} from '../../models/GroupChat';
import {EditMessageComponent} from '../edit-message/edit-message.component';
import {flatMap, map, toArray} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public chatGroups = [];
  sendDisabled: boolean = false;
  public chatMessages = [];
  public chatId: string = '';
  public oldChatId = '';
  public join = false;
  public showChat = false;
  public hasOpenGroup = false;
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
    'type': Type.CHAT,
    'file': ''
  };
  selectedFile = null;
  selecteImage: string;
  private base64textString: string;
  imgsrc: string;
  @ViewChild('modal')
  private modal: TemplateRef<any>;

  @ViewChild('scroll', {read: ElementRef})
  private myscroll: ElementRef;

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
        console.log('x', x);
        this.chatGroups.push(x);
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
      console.log('testo mesazhi per socket');
      if (newMessage.groupChatId != this.chatId) {
        this.activeGroup.forEach((group) => {
          if (group.id == newMessage.groupChatId) {

            group.hasNewMessage = true;
          }
        });
      }
      let that = this;
      if (newMessage.typee == 'post') {


        let newMess = {
          id: newMessage.id,
          sender: newMessage.sender,
          context: newMessage.context,
          type: newMessage.type,
          groupChatId: newMessage.groupChatId,
          time: newMessage.time,
          file: newMessage.file
        };

        if (this.chatId == newMess.groupChatId) {
          this.messageTobeShownInchat.push(newMess);
        }

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

  ngAfterViewChecked() {
    if (this.showChat) {
      this.myscroll.nativeElement.scrollTop = this.myscroll.nativeElement.scrollHeight;

    }
  }

  onFileSelected(event) {
    const files = event.target.files;
    const file = event.target.files[0];
    this.selectedFile = event.target.files[0];
    this.sendDisabled=false
    console.log(files)
    console.log(file, 'blobiiii');
    if (files && file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
    event.target.value = '';
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(this.base64textString));
    this.imgsrc = this.base64textString;
  }

  saveUsername() {
    this.username = this.usernameForm.getRawValue().username;
    // localStorage.setItem('username',this.username);

  }

  sendMessage() {
    this.createMessageToStore('new');
    console.log(this.messageToBeSent);
    this.getDataService.postMessages(this.messageToBeSent).subscribe(res => {
        this.messageForm.reset();
        this.imgsrc = null;
      this.sendDisabled=true ;
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
    this.activeGroup.forEach((group1) => {
      if (group1.id == group.id) {
        group1.hasNewMessage = false;
      }
    });
    this.activeGroup = this.activeGroup.filter(x => x.id !== group.id);
    this.messageToBeSent.groupChatId = group.id;
    this.createMessageToStore('join');
    this.getDataService.postMessages(this.messageToBeSent).subscribe();
    if (this.activeGroup.length == 0) {
      this.hasOpenGroup = false;
    }

  }

  openChat(group) {
    this.hasOpenGroup = true;
    this.chatId = group.id;
    console.log(group.id);
    this.showChat = true;
    if (this.join) {

      this.activeGroup.forEach((group1) => {
        if (group1.id == group.id) {
          group1.hasNewMessage = false;
        }
      });
    }
    if (!this.join) {
      this.activeGroup.push(group);
      this.createMessageToStore('open');
    }

    if (this.isGroupActive(group.id)) {
      console.log('trueeeeee');
      this.activeGroup.push(group);
      this.createMessageToStore('open');


      this.getDataService.postMessages(this.messageToBeSent).subscribe();
    }
    ;
    this.join = true;
    this.chatMessages = [];
    this.messageTobeShownInchat = [];
    this.httpService.getMessagesByChatId(group.id).subscribe(messages => {
      if (messages.length > 0) {
        this.chatMessages = messages;
        this.addMessagesIntoChat();
      }
    });
  }



  getData() {
    this.httpService.getGroups().pipe(
      flatMap(gruops => gruops),
      map(group => {
        group.hasNewMessage = false;
        return group;
      }),
      toArray()
    ).subscribe(groups => {
      this.chatGroups = groups;
      console.log(groups);
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
    dialogConfig.width = '20%';
    dialogConfig.data = this.chatGroups;
    this.dialog.open(AddGroupComponent, dialogConfig).afterClosed().subscribe(res => {
    });
  }

  editMesage(message) {
    console.log(message);
    if ((message.type === 'JOIN' || message.file != null) || message.type === 'DELETE') {
      console.log('return');
      return;
    }
    let that = this;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    dialogConfig.height = '25%';
    dialogConfig.data = message;
    this.dialog.open(EditMessageComponent, dialogConfig).afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      console.log(res);
      if (res != '') {
        var index = this.messageTobeShownInchat.map(function(current, index) {
          if (current.id == message.id) {
            that.pos = index;
            that.res = res;
            return index;
          }
        });
        let context;
        let type;
        if (res == 'delete') {
          context = 'DELETED';
          type = 'DELETE';
        } else {
          context = this.res;
          type = 'EDIT';
        }
        this.messageTobeShownInchat[this.pos].context = context;
        this.chatMessages[this.pos].context = context;
        this.chatMessages[this.pos].type = type;
        this.getDataService.updateMessages(this.chatMessages[this.pos], this.chatMessages[this.pos].id).subscribe();
      }
    });
  }

  notifyForEditMessage() {
    this.messageTobeShownInchat[this.pos].context = this.res;
  }

  write(event) {
    if (!event.target.value && this.imgsrc === null) {
     // console.log(this.imgsrc)
      console.log(event.target.value,"test@123")
      this.sendDisabled = true;
    } else {
      this.sendDisabled = false;
    }
  }

  openImg(imgUrl) {
    this.selecteImage = imgUrl;
    this.dialog.open(this.modal);
  }

  createMessageToStore(typeOfAction) {
    let context;
    let type;
    let sender;
    let groupChatId;
    let file;
    let today = new Date();
    let time;
    if (typeOfAction == 'new') {
      console.log('new');
      context = this.messageForm.getRawValue().message;
      type = Type.CHAT;
      sender = this.username;
      groupChatId = this.chatId;
      file = this.imgsrc;
      time = today.getHours() + ':' + today.getMinutes();
      this.messageToBeSent.groupChatId = groupChatId;

    } else {
      if (typeOfAction == 'join') {
        context = this.username + ' left';
        type = Type.JOIN;
        sender = '';
        file = null;
        time = '';
        this.messageToBeSent.groupChatId = this.chatId;
      } else {
        context = this.username + ' joined';
        type = Type.JOIN;
        sender = '';
        file = null;
        time = '';
        this.messageToBeSent.groupChatId = this.chatId;
      }
    }

    this.messageToBeSent.context = context;
    this.messageToBeSent.sender = sender;
    this.messageToBeSent.time = time;
    this.messageToBeSent.type = type;
    this.messageToBeSent.file = file;
  }
}
