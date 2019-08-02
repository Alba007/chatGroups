import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component'
import { AddGroupComponent } from './components/add-group/add-group.component';
import { DeleteComponent } from './components/delete/delete.component';
import { FormsModule,  } from '@angular/forms';
import {MaterialModule} from "./material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule,MatMenuModule,MatFormFieldModule ,MatInputModule,MatSelectModule, MatDialogModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ChatComponent} from "./components/chat/chat.component";
import { EditMessageComponent } from './components/edit-message/edit-message.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';

@NgModule({
  declarations: [
    AppComponent,
    AddGroupComponent,
    DeleteComponent,
    ChatComponent,
    EditMessageComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularFileUploaderModule
],
entryComponents:[AddGroupComponent,DeleteComponent,EditMessageComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
