import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.css']
})
export class EditMessageComponent implements OnInit {
   newMess=""
  constructor(private matdalogref: MatDialogRef<EditMessageComponent>) { }

  ngOnInit() {
  }
  closeDialog() {
    //mbyllet dialogu i hapur
    this.matdalogref.close()
  }
}
