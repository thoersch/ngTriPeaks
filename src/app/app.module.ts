import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PeakRowComponent } from './peak-row.component';
import { PeakRowPipe } from './peak-row.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PeakRowComponent,
    PeakRowPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
