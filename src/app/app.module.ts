import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MusicplayerComponent } from './components/musicplayer/musicplayer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    WelcomeComponent,
    MusicplayerComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
