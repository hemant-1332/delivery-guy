import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from '../model/Item';


@Injectable({
  providedIn: 'root'
})

export class ItemsService{

    private itemURL = 'api/items'; // URL to web api
    constructor(private http: HttpClient) { }

    
  
  getItem(id: number): Observable<Item> {
      console.log('>>Getting item: for id: ' + id)
    const url = `${this.itemURL}/${id}`;
    return this.http.get<Item>(url).pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
  }

  
  getAllItem(): Observable<Item[]> {
    console.log('>>Getting all item')
  const url = `${this.itemURL}`;
  return this.http.get<Item[]>(url).pipe(
    tap(_ => this.log(`fetching all`)),
    catchError(this.handleError<Item[]>(`getAll`))
  );
}

getAllItemDeadline(): Observable<Item[]> {
  console.log('>>Getting all item')
const url = `api/deadline`;
return this.http.get<Item[]>(url).pipe(
  tap(_ => this.log(`fetching all`)),
  catchError(this.handleError<Item[]>(`getAll`))
);
}


    
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
       console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  private log(message: string) {
    console.log('ItemService: ' + message);
  }

}