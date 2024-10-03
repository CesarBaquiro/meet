import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouletteComponent } from './components/roulette/roulette.component';

const appRoutes: Routes = [
  { path: 'ruleta', component: RouletteComponent },
];

@NgModule({
  declarations: [AppComponent, NavBarComponent, RouletteComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
