import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public chatGroups = [];
  public chatMessages = [];
  messageForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });
    this.chatGroups = ['gr1', 'gr2', 'gr3'];
    this.chatMessages = ['msg1', 'msg2', 'msg3'];
  }


  sendMessage() {

    console.log('msg sent',this.messageForm.getRawValue());
  }
}
