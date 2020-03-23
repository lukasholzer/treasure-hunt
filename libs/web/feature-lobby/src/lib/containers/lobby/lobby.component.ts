import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameFacade } from '@treasure-hunt/web/data-access';

@Component({
  selector: 'fl-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent {
  activePlayers$ = this._gameFacade.activePlayers$;

  constructor(private _gameFacade: GameFacade) {}

  _joinLobby(): void {
    this._gameFacade.joinGame();
  }

  _startGame(): void {
    console.log('start game')
  }
}
