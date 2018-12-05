import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from '../app.component';
import {WebStorageModule} from "ngx-store";
import {SessionStorageService} from "ngx-store";

describe('Main App (AppComponent)', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                WebStorageModule,
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));

    it('Should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('Should show a menu bar', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector('.navbar-brand').textContent)
            .toContain('Epic Tournament System');
    }));

    it("should have a router added", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.componentInstance.test();
    }));
});
