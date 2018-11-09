import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

import { WebStorageModule } from "ngx-store";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

import { AppRoutingModule } from './app-routing.module';
import { PeopleRoutingModule } from './modules/people/people-routing.module';
import { TournamentRoutingModule } from './modules/tournaments/tournament-routing.module';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "angular-6-social-login";
import { AuthComponent } from './modules/auth/auth.component';
import { AuthGuard } from "./services/auth-guard.service";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("648917249894-18q6iqkftv3ukljp1c2oelenndnp49du.apps.googleusercontent.com")
    }
  ]);

  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    PeopleRoutingModule,
    TournamentRoutingModule,
    AppRoutingModule,
    SocialLoginModule,
    WebStorageModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
