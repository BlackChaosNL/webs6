import {async, TestBed} from "@angular/core/testing"
import {CreateTournamentComponent} from "../modules/tournaments/create-tournament/create-tournament.component";
import {FormsModule} from "@angular/forms";
import {TournamentListComponent} from "../modules/tournaments/tournament-list/tournament-list.component";
import {MockService} from "../services/mock-service";
import {TournamentService} from "../services/tournament.service";
import {PeopleService} from "../services/people.service";

describe('CreateTournamentComponent', () => {
    beforeEach(async(() => {
        let service = new MockService<{ key: string, name: string }>();

        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                TournamentListComponent,
                CreateTournamentComponent,
            ],
            providers: [
                {provide: TournamentService, useValue: service},
                {provide: PeopleService, useValue: service},
            ]
        }).compileComponents();
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(CreateTournamentComponent);
        const instance = fixture.debugElement.componentInstance;
        expect(instance).toBeTruthy();
    });
});