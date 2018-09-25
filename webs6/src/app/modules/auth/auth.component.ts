import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SessionStorageService } from "ngx-store";

import {
  AuthService,
  GoogleLoginProvider
} from "angular-6-social-login";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private socialAuthService: AuthService,
    private session: SessionStorageService,
    private router: Router
  ) { }

  ngOnInit() { }

  public socialSignIn(
    socialPlatform: string
  ) {
    let socialPlatformProvider = this.getPlatform(socialPlatform);

    this.socialAuthService
      .signIn(socialPlatformProvider)
      .then(data => {
        // Set important data for session keeping
        this.session.set("auth.id", data.id);
        this.session.set("auth.token", data.token);

        // Add additional data here
        this.session.set("auth.name", data.name);

        // Redirect?
        this.router.navigate([ "/" ]);
      })
      ;
  }

  private getPlatform (
    name: string
  ) {
    if (name == "google") {
      return GoogleLoginProvider.PROVIDER_ID;
    }

    throw Error("No support for unknown platform: " + name);
  }

}
