import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component'
import { AddGroupComponent } from './components/add-group/add-group.component';
import { DeleteComponent } from './components/delete/delete.component';

import {MaterialModule} from "./material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule,MatMenuModule,MatFormFieldModule ,MatInputModule,MatSelectModule, MatDialogModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ChatComponent} from "./components/chat/chat.component";


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
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
],
entryComponents:[AddGroupComponent,DeleteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
