import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private url = 'http://localhost:5200';
  private singleItem$: Subject<Item> = new Subject();
  private items$: Subject<Item[]> = new Subject();
  private searchItems$: Subject<Item[]> = new Subject();
  constructor(private httpClient: HttpClient) {}

  private refreshItems(url: string) {
    let fullUrl = `${this.url}/${url}`;
    this.httpClient.get<Item[]>(fullUrl).subscribe((items) => {
      this.items$.next(items);
    });
  }

  getItems_Observable(url: string): Subject<Item[]> {
    this.refreshItems(url);
    return this.items$;
  }

  searchBarGetItems(): Subject<Item[]> {
    // this.refreshItems('items');
    // return this.items$;
    //this needed a new instance of an items$ array, it was using the same instance of items$
    //meaning it was being updated when different components were rendered
    this.httpClient.get<Item[]>(`${this.url}/items`).subscribe((items) => {
      this.searchItems$.next(items);
    });
    return this.searchItems$;
  }

  getSingleItem(id: string): Subject<Item> {
    this.httpClient.get<Item>(`${this.url}/items/${id}`).subscribe((item) => {
      this.singleItem$.next(item);
    });
    return this.singleItem$;
  }

  //doing it as a subject not an observable
  // updateItem(id: string, item: Item): Subject<string> {
  //   this.httpClient.put(`${this.url}/employees/${id}`, item, { responseType: 'text' }).subscribe(item => {
  //     this.singleItem$.next(item);
  //   });
  //   return this.items$;
  // }

  createItem(item: Item): Observable<string> {
    return this.httpClient.post(`${this.url}/items`, item, {
      responseType: 'text',
    });
  }

  updateItem(id: string, item: Item): Observable<string> {
    return this.httpClient.put(`${this.url}/items/${id}`, item, {
      responseType: 'text',
    });
  }

  deleteItem(id: string): Observable<any> {
    return this.httpClient.delete(`${this.url}/items/${id}`, {
      responseType: 'text',
    });
  }
}
