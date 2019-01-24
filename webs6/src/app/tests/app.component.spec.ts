import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from '../app.component';
import {WebStorageModule} from "ngx-store";
import {AppAuthService} from "../services/app-auth.service";


describe('Main App (AppComponent)', () => {
    let service;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                WebStorageModule,
            ],
            declarations: [
                AppComponent
            ],
            providers: [{provide: AppAuthService, useValue: service}]
        }).compileComponents();

        service = TestBed.get(AppAuthService);
    }));

    it('Should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('Should show a menu bar', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        expect(fixture.debugElement.nativeElement.querySelector('.navbar-brand').textContent)
            .toContain('Epic Tournament System');
    }));
});
