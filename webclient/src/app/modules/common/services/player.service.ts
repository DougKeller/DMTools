import { Injectable } from '@angular/core';
import { Player } from '@dm/common/models/player';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersUrl = './assets/players.json';
  private request;
  private players;

  constructor(
    private http: HttpClient
  ) { }

  private mapResponse(results: any): Player[] {
    return results.map((r) => new Player(r))
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Object>(this.playersUrl).pipe(map(this.mapResponse));
  }
}
