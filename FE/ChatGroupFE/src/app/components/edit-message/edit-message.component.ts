import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.css']
})
export class EditMessageComponent implements OnInit {
  newMess="" 
  delete="delete"
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,private matdalogref: MatDialogRef<EditMessageComponent>) { }

  ngOnInit() {
    console.log(this.data)
  }
  closeDialog() {
    //mbyllet dialogu i hapur
    this.matdalogref.close("")
  }
}
