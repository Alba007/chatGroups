import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MaterialModule} from '../material.module';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data ,
  public dialogRef:MatDialogRef<DeleteComponent>){ }

  ngOnInit() {
  }
  closeDialog(){
    this.dialogRef.close(false);
  }
  

}
