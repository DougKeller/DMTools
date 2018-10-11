import { Injectable } from '@angular/core';
import { Enemy } from '@dm/common/models/enemy';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnemyService {
  private enemiesUrl = './assets/enemies.json';
  private request;
  private enemies;

  constructor(
    private http: HttpClient
  ) { }

  private mapResponse(results: any): Enemy[] {
    return results.map((r) => new Enemy(r))
  }

  getEnemies(): Observable<Enemy[]> {
    return this.http.get<Object>(this.enemiesUrl).pipe(map(this.mapResponse));
  }
}
