import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private url = 'http://localhost:5200';
  private items$: Subject<Item[]> = new Subject();
  // private items : Item[] = [];
  constructor(private httpClient: HttpClient) { }
  
  private refreshItems(url:string) {
    this.httpClient.get<Item[]>(`${this.url}/${url}`)
      .subscribe(items => {
        this.items$.next(items);
        // this.items = items;
      });
  }
  
  getItems_Observable(url:string): Subject<Item[]> {
    this.refreshItems(url);
    return this.items$; 
  }

  // getItems_Array(): Item[]{
  //   this.refreshItems;
  //   return this.items;
  // }
  
  getItem(id: string): Observable<Item> {
    return this.httpClient.get<Item>(`${this.url}/items/${id}`);
  }
  
  createItem(item: Item): Observable<string> {
    return this.httpClient.post(`${this.url}/items`, item, { responseType: 'text' });
  }
  
  updateItem(id: string, item: Item): Observable<string> {
    return this.httpClient.put(`${this.url}/items/${id}`, item, { responseType: 'text' });
  }
  
  deleteItem(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/items/${id}`, { responseType: 'text' });
  }
 }

