import {Component, OnInit, AfterViewInit, Inject} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {WebSocketService} from '../WebSocketService';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

export interface DialogData {
  username: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  public chatGroups = [];
  public chatMessages = [];
  messageForm: FormGroup;
  public username;

  constructor(private aaa: WebSocketService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });
    this.chatGroups = ['gr1', 'gr2', 'gr3'];
    this.chatMessages = ['msg1', 'msg2', 'msg3'];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.openDialog();
    }, 300);
  }

  sendMessage() {
    const chatMessage = this.messageForm.getRawValue();
    this.aaa.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
    console.log('msg sent', this.messageForm.getRawValue());
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {username: this.username}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.username = result;
    });
  }
}

@Component({
  selector: 'app-modal',
  templateUrl: './Modal.component.html'
})

export class ModalComponent {

  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
