import { ChangeDetectionStrategy, Component, ViewChild, ElementRef } from '@angular/core';
import { GameFacade } from '@treasure-hunt/web/data-access';

@Component({
  selector: 'fl-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent {
  lobbyName = '';

  activePlayers$ = this._gameFacade.activePlayers$;
  player$ = this._gameFacade.player$;
  lobby$ = this._gameFacade.lobby$;
  gameReady$ = this._gameFacade.gameReady$;

  constructor(private _gameFacade: GameFacade) {
    this._gameFacade.reconnect()
  }

  _joinLobby(): void {
    console.log('join')
    this._gameFacade.joinLobby(this.lobbyName);
  }

  _leaveLobby(): void {
    this._gameFacade.leaveLobby();
  }

  _startGame(): void {
    this._gameFacade.startGame();
  }
}
