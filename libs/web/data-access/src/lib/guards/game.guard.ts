import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, mapTo } from 'rxjs/operators';
import { GameFacade } from '../+state/game/game.facade';

@Injectable()
export class GameGuard implements CanActivate {
  constructor(private _gameFacade: GameFacade, private _router: Router) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ) {
    return true;
    // return this._gameFacade.gameReady$.pipe(
    //   tap(console.log),
    //   map(character => Boolean(character)),
    //   tap(character => {
    //     // if (!character) {
    //     //   this._router.navigate(['/game/character']);
    //     // }
    //   }),
    //   mapTo(true)
    // );
  }
}
