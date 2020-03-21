import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Player } from '@witch-hunter/api-interfaces';

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
          tap(player => {
            localStorage.setItem('player', JSON.stringify(player));
          }),
          share()
        );
    }
  }
}
