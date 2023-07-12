import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/partials/search/search.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { RouterModule } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, SearchComponent, ProductPageComponent, TagsComponent, CartPageComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    MatIconModule, 
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
