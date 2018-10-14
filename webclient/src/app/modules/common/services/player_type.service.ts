import { Injectable } from '@angular/core';
import { PlayerType } from '@dm/common/models/player_type';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CreatureParameters } from '@dm/common/interfaces/creature_parameters';

@Injectable({
  providedIn: 'root'
})
export class PlayerTypeService {
  private playersUrl = './assets/players.json';

  constructor(
    private http: HttpClient
  ) { }

  private mapResponse(results: CreatureParameters[]): PlayerType[] {
    return results.map((r) => new PlayerType(r));
  }

  getPlayerTypes(): Observable<PlayerType[]> {
    return this.http.get<CreatureParameters>(this.playersUrl).pipe(map(this.mapResponse));
  }
}
