import * as encodeUrl from "encodeurl";
import { Injectable } from "@angular/core";
import { SessionStorageService } from "ngx-store";

import {
  CanActivate,
  Router
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (
    private router: Router,
    private session: SessionStorageService
  ) { }

  canActivate () {
    let id = this.session.get("auth.id");
    let token = this.session.get("auth.token");

    if (this.verifyAuth(id, token)) {
      return true;
    }

    // In case user is not verified.

    this.session.set("auth.redirect", this.router.url);

    this.router.navigate([ "/auth" ], {
      queryParams: {
        // TODO: This currently seems to always redirect to /
        for: encodeUrl(this.router.url)
      }
    });
  }

  private verifyAuth (
    id: string,
    token: string
  ) {
    if (!id) { return false; }
    if (!token) { return false; }

    return true;
  }

}
