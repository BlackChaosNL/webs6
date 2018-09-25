import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { BaseServiceProvider } from "./base.service";
import { Injectable } from "@angular/core";
import { TournamentType } from "../classes/tournamentType";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TournamentTypeService implements BaseServiceProvider {

  private db: AngularFireDatabase;
	private ref: AngularFireList<TournamentType>;

	constructor(
    db: AngularFireDatabase
  ) {
    this.db = db;
		this.ref = db.list('/tournamentType');
	}

  getSingleItem(key: any) : Observable<any> {
		return this.db
      .object(`/tournamentType/${key}`)
      .valueChanges()
      ;
  }

    getAll() : Observable<any[]>{
		return this.ref.snapshotChanges()
			.pipe(map(actions => actions.map(a => ({ key: a.key, ...a.payload.val()})))
		);
    }

	Add(item: TournamentType) {
		return this.ref.push(item).key;
	}

    Edit(key: any, item: TournamentType) {
		this.ref.set(key, item);
    }

    Delete(key: any) {
		this.ref.remove(key);
    }
}
