import { Injectable } from '@angular/core';
import { EnemyType } from '@dm/common/models/enemy_type';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CreatureParameters } from '@dm/common/interfaces/creature_parameters';

@Injectable({
  providedIn: 'root'
})
export class EnemyTypeService {
  private enemiesUrl = './assets/enemies.json';

  constructor(
    private http: HttpClient
  ) { }

  private mapResponse(results: CreatureParameters[]): EnemyType[] {
    return results.map((r) => new EnemyType(r));
  }

  getEnemyTypes(): Observable<EnemyType[]> {
    return this.http.get<CreatureParameters>(this.enemiesUrl).pipe(map(this.mapResponse));
  }
}
