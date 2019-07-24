import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { DeleteComponent } from './delete/delete.component';
import {ChatComponent} from './chat/chat.component';
import { MessageFieldComponent } from './message-field/message-field.component';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
