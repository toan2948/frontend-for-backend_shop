import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {LeftSideBarModule} from "./left-side-bar/left-side-bar.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TopBarModule} from "./top-bar/top-bar.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductInterceptor} from "./product.interceptor";
import {ReactiveFormsModule} from "@angular/forms";
import {ApiModule} from "./api/api.module";
import {ProductModule} from "./product/product.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LeftSideBarModule,
    TopBarModule,
    ApiModule,
    ProductModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProductInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
