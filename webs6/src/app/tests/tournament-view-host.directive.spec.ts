import {TournamentViewHostDirective} from '../directives/tournament-view-host.directive';
import {Component, NO_ERRORS_SCHEMA} from "@angular/core";
import {TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

@Component({
    template: '<div app-tournament-view-host></div>'
})
class TestComponent {
}

let fixture;

describe('TournamentViewHostDirective', () => {
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TestComponent, TournamentViewHostDirective],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(TestComponent);
        fixture.detectChanges();
    });

    it('should be present on TestComponent', () => {
        expect(fixture.debugElement.queryAll(
            By.directive(TournamentViewHostDirective)).length
        ).toBe(1);
    });

    it('should have a viewContainerRef', () => {
        let debugElement = fixture.debugElement.query(By.directive(TournamentViewHostDirective));
        let debugDirective = debugElement.injector.get(TournamentViewHostDirective);
        expect(debugDirective.containerRef).toBeTruthy();
    });
});
