import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CreatureParameters } from '@dm/common/interfaces/creature_parameters';
import { CreatureType } from '@dm/common/models/creature_type';

@Injectable({
  providedIn: 'root'
})
export class PlayerTypeService {
  private playersUrl = './assets/players.json';

  constructor(
    private http: HttpClient
  ) { }

  private mapResponse(results: CreatureParameters[]): CreatureType[] {
    return results.map((r) => new CreatureType(r, false));
  }

  getPlayerTypes$(): Observable<CreatureType[]> {
    return this.http.get<CreatureParameters>(this.playersUrl).pipe(map(this.mapResponse));
  }
}
