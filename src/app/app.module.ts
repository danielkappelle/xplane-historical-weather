import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileSizePipe } from './file-size.pipe';
import { RouterModule } from '@angular/router';
import { ConverterService } from './converter.service';

@NgModule({
  declarations: [
    AppComponent,
    FileSizePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent
      }
    ])
  ],
  providers: [
    ConverterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
