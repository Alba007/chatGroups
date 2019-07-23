import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { DeleteComponent } from './delete/delete.component';
import { ChatComponent } from './chat/chat.component';
import { MessageFieldComponent } from './message-field/message-field.component';

@NgModule({
  declarations: [
    AppComponent,
    AddGroupComponent,
    DeleteComponent,
    ChatComponent,
    MessageFieldComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
