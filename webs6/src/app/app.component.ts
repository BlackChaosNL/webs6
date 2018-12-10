import {Component} from '@angular/core';
import {SessionStorageService} from "ngx-store";
import {MockService} from "./services/mock-service";
import {Person} from "./classes/person";

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
