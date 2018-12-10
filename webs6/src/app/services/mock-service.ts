import {Observable} from "rxjs/index";

export interface HasKey {
    key: string;
}

export class MockService<T extends HasKey> {
    private elements: T[];

    constructor(elems: T[] = null) {
        this.elements = elems === null ? [] : elems;
    }

    getAll(): Observable<T[]> {
        return new Observable(sub => {
            sub.next(this.elements);
            sub.complete();
        });
    }

    getSingleItem(key: any): Observable<T> {
        let values = this.elements.filter(e => {
            return e.key === key
        });

        return new Observable(sub => {
            sub.next(values.length > 0 ? values[0] : null);
            sub.complete();
        });
    }

    Add(item: T) {
        this.elements.push(item);
    }

    Edit(key: any, item: T) {
        let filtered = this.elements.filter(e => {
            return e.key !== key
        });
        this.elements = filtered.concat([item]);
    }

    Delete(key: any) {
        this.elements = this.elements.filter(e => {
            return e.key !== key
        });
    }
}