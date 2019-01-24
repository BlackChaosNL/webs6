import * as encodeUrl from "encodeurl";
import { Injectable } from "@angular/core";
import { SessionStorageService } from "ngx-store";

import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router, RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private session: SessionStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.session.get('auth.user') !== null) return true;

    this.router.navigate(["/auth"], {
      queryParams: {
        for: encodeUrl(state.url)
      }
    });

    return false;
  }
}
