import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
	public selectedTournament: Subject<string> = new Subject;

	setTournament(item: string) : void {
    this.selectedTournament.next(item);
	}

	getTournament() : Observable<string> {
		return this.selectedTournament.asObservable();
	}
}
