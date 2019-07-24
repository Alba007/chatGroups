import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {GroupChat} from '../../models/GroupChat';
import {DeleteComponent} from '../delete/delete.component';
import {HttpReqService} from '../../services/http-req-service.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ChatComponent} from '../chat/chat.component';


@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  public groupForm: FormGroup;
  public groupChat: GroupChat;
//ndryshoje
  public data: any;

  constructor(private httpService: HttpReqService, private dialog: MatDialog, public dialogRef: MatDialogRef<ChatComponent>) {
  }

  ngOnInit() {
    this.initData();
    this.fillData(this.data);
  }

  initData() {
    this.groupForm = new FormGroup({
      name: new FormControl(',', Validators.required)
    })

  }

  fillData(data) {
    if (data) {
      console.log(this.data.name);
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
          console.log("Deleted!");


        })
      }
      this.onclose();
    })

  }

  addGroup() {

    if (this.groupForm.invalid) {
      return;
    }
    this.groupChat = {...this.groupForm.getRawValue()}
    if (this.data) {
      this.groupChat._id = this.data._id;
      this.httpService.updateGroup(this.groupChat).subscribe(
        data => console.log('success', data),
        error => console.error('Error', error)
      );
    } else {

      this.httpService.saveGroup(this.groupChat).subscribe(
        data => console.log('Success!', data),
        error => console.error('Error!', error)
      );
    }

    this.onclose();
  }

  onclose() {
    this.dialogRef.close();
  }

}
