import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TournamentViewComponent} from '../modules/tournaments/tournament-views/tournament-view/tournament-view.component';
import {FormsModule} from "@angular/forms";

describe('TournamentViewComponent', () => {
    let component: TournamentViewComponent;
    let fixture: ComponentFixture<TournamentViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TournamentViewComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TournamentViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
