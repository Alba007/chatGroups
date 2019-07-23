import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule,
  MatNativeDateModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatGridListModule,
  MatInputModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSliderModule,
} from '@angular/material';

@NgModule({
  exports: [CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSliderModule,
    MatButtonModule

  ],
})
export class MaterialModule { }
