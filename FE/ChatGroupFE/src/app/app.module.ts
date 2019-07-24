import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { DeleteComponent } from './delete/delete.component';
import { ChatComponent } from './chat/chat.component';
import { MessageFieldComponent } from './message-field/message-field.component';
import {MaterialModule} from "./material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpReqService} from './http-req-service.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    AddGroupComponent,
    DeleteComponent,
    ChatComponent,
    MessageFieldComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
],
  providers: [HttpReqService],
  bootstrap: [AppComponent]
})
export class AppModule { }
