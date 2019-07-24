import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpReqService} from '../http-req-service.service';
import {GroupChat} from '../GroupChat'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public chatGroups = [];
  public chatMessages = [];
  messageForm: FormGroup;

  constructor(private service: HttpReqService) {
  }

  ngOnInit() {
    this.getChatGroups();
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });
    this.chatGroups = [];
    this.chatMessages = ['msg1', 'msg2', 'msg3'];
  }

  getChatGroups(): void {
    this.service.getGroups().subscribe(data => {
      this.chatGroups.push();
    })

  }

  sendMessage() {

    console.log('msg sent',this.messageForm.getRawValue());
  }
}
