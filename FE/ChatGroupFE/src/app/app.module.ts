import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app/components/app.component'
import { AddGroupComponent } from '../app/components/add-group/add-group.component';
import { DeleteComponent } from '../app/components/delete/delete.component';
import { ChatComponent } from '../app/components/chat/chat.component';

import {MaterialModule} from "./material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    AddGroupComponent,
    DeleteComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
