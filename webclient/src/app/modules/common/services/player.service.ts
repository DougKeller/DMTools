import { Injectable } from '@angular/core';
import { Player } from '@dm/common/models/player';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CreatureParameters } from '@dm/common/interfaces/creature_parameters';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersUrl = './assets/players.json';

  constructor(
    private http: HttpClient
  ) { }

  private mapResponse(results: CreatureParameters[]): Player[] {
    return results.map((r) => new Player(r));
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<CreatureParameters>(this.playersUrl).pipe(map(this.mapResponse));
  }
}
