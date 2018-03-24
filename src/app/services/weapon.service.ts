import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Weapon } from '../data/weapon';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WeaponService {

  private weaponsUrl = 'api/weapons';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET weapons from the server */
  public getWeapons (): Observable<Weapon[]> {
    return this.http.get<Weapon[]>(this.weaponsUrl)
      .pipe(
        map(weapons => Weapon.fromJSONArray(weapons)),
        tap(weapons => this.log(`fetched weapons`)),
        catchError(this.handleError('getWeapons', []))
      );
  }

  /** GET weapon by id. Return `undefined` when id not found */
  public getWeaponNo404<Data>(id: number): Observable<Weapon> {
    const url = `${this.weaponsUrl}/?id=${id}`;
    return this.http.get<Weapon[]>(url)
      .pipe(
        map(weapons => weapons[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} weapon id=${id}`);
        }),
        catchError(this.handleError<Weapon>(`getWeapon id=${id}`))
      );
  }

  /** GET weapon by id. Will 404 if id not found */
  public getWeapon(id: number): Observable<Weapon> {
    const url = `${this.weaponsUrl}/${id}`;
    return this.http.get<Weapon>(url).pipe(
      map(weapon => Weapon.fromJSON(weapon)),
      tap(_ => this.log(`fetched weapon id=${id}`)),
      catchError(this.handleError<Weapon>(`getWeapon id=${id}`))
    );
  }

  /* GET weapons whose name contains search term */
  public searchWeapons(term: string): Observable<Weapon[]> {
    if (!term.trim()) {
      // if not search term, return empty weapon array.
      return of([]);
    }
    return this.http.get<Weapon[]>(`api/weapons/?name=${term}`).pipe(
      tap(_ => this.log(`found weapons matching "${term}"`)),
      catchError(this.handleError<Weapon[]>('searchWeapons', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new weapon to the server */
  public addWeapon (weapon: Weapon): Observable<Weapon> {
    return this.http.post<Weapon>(this.weaponsUrl, weapon, httpOptions).pipe(
      map(weapon => Weapon.fromJSON(weapon)),
      tap((weapon: Weapon) => this.log(`added weapon w/ id=${weapon.id}`)),
      catchError(this.handleError<Weapon>('addWeapon'))
    );
  }

  /** DELETE: delete the weapon from the server */
  public deleteWeapon (weapon: Weapon | number): Observable<Weapon> {
    const id = typeof weapon === 'number' ? weapon : weapon.id;
    const url = `${this.weaponsUrl}/${id}`;

    return this.http.delete<Weapon>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted weapon id=${id}`)),
      catchError(this.handleError<Weapon>('deleteWeapon'))
    );
  }

  /** PUT: update the weapon on the server */
  public updateWeapon (weapon: Weapon): Observable<any> {
    return this.http.put(this.weaponsUrl, weapon, httpOptions).pipe(
      tap(_ => this.log(`updated weapon id=${weapon.id}`)),
      catchError(this.handleError<any>('updateWeapon'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a weaponService message with the MessageService */
  private log(message: string) {
    this.messageService.add('WeaponService: ' + message);
  }
}
