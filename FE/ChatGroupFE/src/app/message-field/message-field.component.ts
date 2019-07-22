import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-field',
  templateUrl: './message-field.component.html',
  styleUrls: ['./message-field.component.css']
})
export class MessageFieldComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function(){
      $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
      });
    });
  }

}
