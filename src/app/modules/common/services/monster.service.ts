import { Injectable } from '@angular/core';
import { Monster } from '@dm/common/models/monster';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  private monstersUrl = './assets/monsters.json';
  private request;
  private monsters;

  constructor(
    private http: HttpClient
  ) { }

  private mapResponse(results: any): Monster[] {
    return results.map((r) => new Monster(r))
  }

  getMonsters(): Observable<Monster[]> {
    return this.http.get<Object>(this.monstersUrl).pipe(map(this.mapResponse));
  }
}
