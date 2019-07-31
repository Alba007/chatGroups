import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupChat } from '../../models/GroupChat';
import { DeleteComponent } from '../delete/delete.component';
import { HttpReqService } from '../../services/http-req-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChatComponent } from '../chat/chat.component';


@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  public groupForm: FormGroup;
  public groupChat: GroupChat;
  exist: boolean= false;
  public message=""
  chatGroups: [] = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpReqService, private dialog: MatDialog, public dialogRef: MatDialogRef<ChatComponent>) {
  }
  ngOnInit() {
    this.initData();
    this.fillData(this.data);
  }

  initData() {
    this.chatGroups = this.data
    this.groupForm = new FormGroup({
      name: new FormControl('', Validators.required)
    })

  }

  fillData(data) {
    if (data) {
      this.groupForm.patchValue({
        name: data.name,
      })
    }
  }

  deleteGroup() {
    this.dialog.open(DeleteComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      data: {
        message: 'Do you want do delete '
      }

    }).afterClosed().subscribe(res => {
      if (res) {
        this.httpService.deleteGroup(this.data._id).subscribe(res => {


        })
      }
      this.onclose();
    })

  }

  addGroup() {
    let that = this
    this.exist=false ;
    if (this.groupForm.invalid) {
      return;
    }
    
    this.data.forEach((current)=> {
      if (current.name === that.groupForm.getRawValue().name) {
        this.exist = true;
      }
    })
    if (this.exist) {
      this.message="This group exists"
      return ;
    }
    this.groupChat = { ...this.groupForm.getRawValue() }
    this.groupChat.main = false;


    this.httpService.saveGroup(this.groupChat).subscribe(
      data => console.log('Success!', data),
      error => console.error('Error!', error)
    );
    this.onclose();
  }

  onclose() {
    this.dialogRef.close();
  }

}