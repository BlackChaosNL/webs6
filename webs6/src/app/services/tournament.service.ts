import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { BaseServiceProvider } from "./base.service";
import { Injectable } from "@angular/core";
import { Tournament } from "../classes/tournament";
import { TournamentType } from "../classes/tournamentType";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentService implements BaseServiceProvider {
  private db: AngularFireDatabase;
  private ref: AngularFireList<Tournament>;

  constructor(db: AngularFireDatabase) {
    this.db = db;
    this.ref = db.list('/tournaments');
  }

  getAll(): Observable<any[]> {
    return this.ref.snapshotChanges()
      .pipe(map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))))
      .pipe(map(values => values.map(a => ({ resolvedtype: this.db.object(`/tournamentType/${a.type}`).valueChanges(), ...a }))))
      ;
  }

  getSingleItem(key: any): Observable<any> {
    return this.db.object(`/tournaments/${key}`).valueChanges()
      ;
  }

  Add(item: Tournament) {
    return this.ref.push(item).key;
  }

  Edit(key: any, item: Tournament) {
    this.ref.set(key, item);
  }

  Delete(key: any) {
    this.ref.remove(key);
  }
}
