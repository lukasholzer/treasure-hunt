import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share, tap, switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Player } from '@treasure-hunt/api-interfaces';

@Injectable()
export class PlayerService {
  player$: Observable<Player>;

  constructor(private _httpClient: HttpClient) {
    const playerData = localStorage.getItem('player');

    if (playerData) {
      this.player$ = of(JSON.parse(playerData));
    } else {
      this.player$ = this._httpClient
        .get<Player>('http://uinames.com/api/?region=austria&ext')
        .pipe(
          map(player => ({
            ...player,
            photo: `https://api.adorable.io/avatars/285/${player.name}`,
          })),
          tap(player => {
            localStorage.setItem('player', JSON.stringify(player));
          }),
          share(),
        );
    }
  }
}
