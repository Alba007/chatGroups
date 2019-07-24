import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { WebSocketService } from '../WebSocketService';
import { AddGroupComponent } from '../add-group/add-group.component';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { HttpReqService } from '../http-req-service.service';
import { GroupChatWSService } from 'src/groupChatWs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit{
  public chatGroups = [];
  public chatMessages = [];
  messageForm: FormGroup;

  constructor(private aaa: WebSocketService,private dialog: MatDialog, private httpService:HttpReqService,private groupChatWs:GroupChatWSService) {
  }
  ngAfterViewInit(){
    this.getData();

  }

  ngOnInit() {
    this.aaa.connect();
    
    this.groupChatWs.getMsgSubjectObservable().subscribe(x=>{
      if(x){
       this.chatGroups.push(x)
      }
    
    })
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });
   
  }


  sendMessage() {
    const chatMessage = this.messageForm.getRawValue();
    this.aaa.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    console.log('msg sent',this.messageForm.getRawValue());
  }


  addGroup(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(AddGroupComponent, dialogConfig).afterClosed().subscribe(res => {
     // this.getData()
  
  })

 }
 openChat(id){
   this.chatMessages=[];

   this.httpService.getMessagesByChatId(id).subscribe(messages=>{
 this.chatMessages=messages
   })
   
  

 }

 getData(){
   console.log("called")
   this.httpService.getGroups().subscribe(groups=>{
     console.log(groups)
    
     this.chatGroups=groups;
     this.chatGroups.forEach(group=>{console.log(group.id)})
   })

 
    
}

  

  }



