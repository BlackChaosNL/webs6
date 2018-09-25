import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { BaseServiceProvider } from "./base.service";
import { Injectable } from "@angular/core";
import { Person } from "../classes/person";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService implements BaseServiceProvider {
	private ref: AngularFireList<Person>;

	constructor(db: AngularFireDatabase) {
		this.ref = db.list('/people');
	}

    getAll() : Observable<any[]>{
		return this.ref.snapshotChanges().pipe(
			map(actions => actions.map(a => ({
					key: a.key, ...a.payload.val()
				})
			))
		);
    }

	Add(item: Person) {
		return this.ref.push(item).key;
	}

    Edit(key: any, item: Person) {
		this.ref.set(key, item);
    }

    Delete(key: any) {
		this.ref.remove(key);
    }
}
