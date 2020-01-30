import {async, TestBed} from '@angular/core/testing';

import {PouleViewComponent} from '../modules/tournaments/tournament-views/poule-view/poule-view.component';
import {FormsModule} from "@angular/forms";

describe('PouleViewComponent', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [PouleViewComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PouleViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create the PouleViewComponent', () => {
        expect(component).toBeTruthy();
    });
});
