import {Injectable} from '@angular/core';
import {SessionStorageService} from "ngx-store";
import {AuthService, GoogleLoginProvider, SocialUser} from "angular-6-social-login";
import {Observable, Subject} from "rxjs/index";

@Injectable()
export class AppAuthService {
    private _user: SocialUser | null = null;
    private userSubject: Subject<SocialUser> = new Subject<SocialUser>();
    private loginSubject: Subject<void> = new Subject<void>();
    private logoutSubject: Subject<void> = new Subject<void>();

    constructor(private socialAuthService: AuthService,
                private session: SessionStorageService) {
    }

    public init() {
        this._user = this.session.get('auth.user') !== null ?
            JSON.parse(this.session.get('auth.user')) : null;
        this.userSubject.next(this._user);
    }

    get user(): Observable<SocialUser> {
        return this.userSubject.asObservable();
    }

    get onLogin(): Observable<void> {
        return this.loginSubject.asObservable();
    }

    get onLogout(): Observable<void> {
        return this.logoutSubject.asObservable();
    }

    public login() {
        this.socialAuthService
            .signIn(GoogleLoginProvider.PROVIDER_ID)
            .then(data => {
                this.session.set("auth.user", JSON.stringify(data));
                this.userSubject.next(data);
                this.loginSubject.next();
            });
    }

    public logout() {
        this.session.remove('auth.user');
        this._user = null;
        this.userSubject.next(this._user);
        this.logoutSubject.next();
    }
}
