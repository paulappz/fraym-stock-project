import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartComponent } from './chart/chart.component';
import { UrlInterceptor, LoaderInterceptor } from './helpers';
import { StockDataService } from './services';
import { AlertComponent } from './directives';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatRadioModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    StockDataService,
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
