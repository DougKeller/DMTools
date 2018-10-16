import { Injectable } from '@angular/core';
import { CreatureType } from '@dm/common/models/creature_type';
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

  private mapResponse(results: CreatureParameters[]): CreatureType[] {
    return results.map((r) => new CreatureType(r, true));
  }

  getEnemyTypes(): Observable<CreatureType[]> {
    return this.http.get<CreatureParameters>(this.enemiesUrl).pipe(map(this.mapResponse));
  }
}
