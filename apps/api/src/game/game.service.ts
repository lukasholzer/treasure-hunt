import { Injectable, Logger } from '@nestjs/common';
import { Player } from '@witch-hunter/api-interfaces';
import { Game } from './game';
import { GameStoreFacade } from './+state';

@Injectable()
export class GameService {

  players$ = this._game.players$;

  constructor(private _game: GameStoreFacade) {  }

  join(player: Player) {
    this._game.join(player);
  }
}
