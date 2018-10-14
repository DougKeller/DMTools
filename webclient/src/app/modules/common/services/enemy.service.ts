import { Injectable } from '@angular/core';
import { Enemy } from '@dm/common/models/enemy';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CreatureParameters } from '@dm/common/interfaces/creature_parameters';

@Injectable({
  providedIn: 'root'
})
export class EnemyService {
  private enemiesUrl = './assets/enemies.json';

  constructor(
    private http: HttpClient
  ) { }

  private mapResponse(results: CreatureParameters[]): Enemy[] {
    return results.map((r) => new Enemy(r));
  }

  getEnemies(): Observable<Enemy[]> {
    return this.http.get<CreatureParameters>(this.enemiesUrl).pipe(map(this.mapResponse));
  }
}
