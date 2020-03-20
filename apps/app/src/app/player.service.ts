import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface Birthday {
  dmy: string;
  mdy: string;
  raw: number;
}

export interface CreditCard {
  expiration: string;
  number: string;
  pin: number;
  security: number;
}

export interface Player {
  name: string;
  surname: string;
  gender: string;
  region: string;
  age: number;
  title: string;
  phone: string;
  birthday: Birthday;
  email: string;
  password: string;
  credit_card: CreditCard;
  photo: string;
}

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
