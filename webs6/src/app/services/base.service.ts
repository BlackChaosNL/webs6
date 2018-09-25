import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { base } from '../classes/base.class';
import { Observable } from 'rxjs';

export interface BaseServiceProvider{
	getAll() : Observable<base>;
	Add(item: base) : string;
	Edit(key: String, item: base);
	Delete(key: String);
}
