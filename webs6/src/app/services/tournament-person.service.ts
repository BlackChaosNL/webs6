import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { BaseServiceProvider } from "./base.service";
import { Injectable } from "@angular/core";
import { TournamentPerson } from "../classes/tournamentPerson";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Tournament } from "../classes/tournament";

@Injectable({
  providedIn: 'root'
})

export class TournamentPersonService implements BaseServiceProvider {
  private ref: AngularFireList<TournamentPerson>;
  private db: AngularFireDatabase;

  constructor(db: AngularFireDatabase) {
    this.db = db;
    this.ref = db.list('/tournamentPerson');
  }

  getAll(): Observable<any[]> {
    return this.ref.snapshotChanges()
      .pipe(map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))))
      ;
  }

  // NOTE: Merging an empty person into records to prevent the application
  // from thinking there is no item. We make sure that if there is a person,
  // it'll be resolvable since map does not override already existing keys.
  getAllByTournament(tournament: any): Observable<any[]> {
    return this.db.list('/tournamentPerson', query => {
      return query.orderByChild('tournament').equalTo(tournament);
    }).snapshotChanges()
      .pipe(map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))))
      .pipe(map(actions => actions.map(a => ({ person: "", ...a }))))
      .pipe(map(values => values.map(a => ({ resolvedperson: this.db.object(`/people/${a.person}`).valueChanges(), ...a }))))
      ;
  }

  Add(item: TournamentPerson) {
    return this.ref.push(item).key;
  }

  Edit(key: any, item: TournamentPerson) {
    this.ref.set(key, item);
  }

  Delete(key: any) {
    this.ref.remove(key);
    this.DeleteByTournamentId(key);
  }

  private DeleteByTournamentId(tournamentId: any) {
    this.db.list('/tournamentPerson', query => {
      return query.orderByChild('tournament').equalTo(tournamentId);
    }).remove();
  }

  DeleteByPerson(personId: any) {
    this.db.list('/tournamentPerson', query => {
      return query.orderByChild('person').equalTo(personId);
    }).remove();
  }

  DeleteSpecificPersonFromTournament(tournamentId: any, personId: any) {
    var list = this.db.list('/tournamentPerson', query => {
      return query.orderByChild('tournament_person')
        .equalTo(tournamentId + "_" + personId);
    }).remove();
  }
}
