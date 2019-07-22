import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './WebSocketService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(  private socketService:WebSocketService){


  }

  ngOnInit(): void {
    console.log("hello")
    this.socketService.connect()
  }
  title = 'ChatGroupFE';
  

}
