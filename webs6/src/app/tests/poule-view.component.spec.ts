import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PouleViewComponent} from '../modules/tournaments/tournament-views/poule-view/poule-view.component';
import {FormsModule} from "@angular/forms";

describe('PouleViewComponent', () => {
    let component: PouleViewComponent;
    let fixture: ComponentFixture<PouleViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [PouleViewComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PouleViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
