import {Component} from '@angular/core';
import {SessionStorageService} from "ngx-store";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private userName: string;

    constructor(private session: SessionStorageService) {
        this.userName = this.session.get("auth.name") || "guest";
    }
}
