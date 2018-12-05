import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KnockoutViewComponent} from './knockout-view.component';
import {FormsModule} from "@angular/forms";

describe('KnockoutViewComponent', () => {
    let component: KnockoutViewComponent;
    let fixture: ComponentFixture<KnockoutViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [KnockoutViewComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KnockoutViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
