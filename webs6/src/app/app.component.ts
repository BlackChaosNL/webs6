import {Component, OnInit} from '@angular/core';
import {AppAuthService} from "./services/app-auth.service";
import {SocialUser} from "angular-6-social-login";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public user: SocialUser | null;

    constructor(private auth: AppAuthService, private router: Router) {
    }

    ngOnInit() {
        this.auth.user.subscribe(next => {
            this.user = next;
        });
        this.auth.onLogout.subscribe(() => {
            this.router.navigate(['/tournament']);
        });

        this.auth.init();
    }

    login() {
        this.auth.login();
    }

    logout() {
        this.auth.logout();
    }
}
