import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouletteMeetComponent } from './components/roulette-meet/roulette-meet.component';
import { RouletteTitleComponent } from './components/roulette-title/roulette-title.component';
import { AdsBandComponent } from './components/ads-band/ads-band.component';
import { RoulettesMenuComponent } from './components/roulettes-menu/roulettes-menu.component';
import { RouletteProhibitedComponent } from './components/roulette-prohibited/roulette-prohibited.component';


const appRoutes: Routes = [
  
  { path: 'ruleta', component: RoulettesMenuComponent },
  { path: 'ruleta/arriesgados', component: RouletteMeetComponent },
  { path: 'ruleta/prohibidos', component: RouletteProhibitedComponent },
];

@NgModule({
  declarations: [AppComponent, NavBarComponent, RouletteMeetComponent, RouletteTitleComponent, AdsBandComponent, RoulettesMenuComponent, RouletteProhibitedComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
