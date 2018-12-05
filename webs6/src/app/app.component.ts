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
        Date.prototype.toCustomISOString = function () {
            return this.getFullYear() + '-' +
                (this.getMonth() > 9 ? this.getMonth() : '0' + (this.getMonth() + 1)) + '-' +
                (this.getDate() > 9 ? this.getDate() : '0' + this.getDate()) +
                'T' + (this.getHours() > 9 ? this.getHours() : '0' + this.getHours()) +
                ':' + (this.getUTCMinutes() > 9 ? this.getUTCMinutes() : '0' + this.getUTCMinutes());
        }
    }
}
