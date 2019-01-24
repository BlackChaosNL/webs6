import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppAuthService} from "../../services/app-auth.service";
import {Subscription} from "rxjs/index";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    private sub: Subscription;

    constructor(private auth: AppAuthService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.sub = this.auth.onLogin.subscribe(() => {
            this.router.navigate([this.route.snapshot.queryParams['for'] || '/'])
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public login() {
        this.auth.login();
    }
}
