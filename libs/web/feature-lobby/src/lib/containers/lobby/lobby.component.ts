import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameFacade, LobbyFacade } from '@treasure-hunt/web/data-access';

@Component({
  selector: 'fl-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent {
  lobbyName = '';

  activePlayers$ = this._lobbyFacade.activePlayers$;
  player$ = this._lobbyFacade.player$;
  lobby$ = this._lobbyFacade.lobbyName$;
  gameReady$ = this._lobbyFacade.gameReady$;

  constructor(
    private _lobbyFacade: LobbyFacade,
    private _gameFacade: GameFacade,
  ) {
    this._lobbyFacade.reconnect();
  }

  _joinLobby(): void {
    if (this.lobbyName.length) {
      this._lobbyFacade.joinLobby(this.lobbyName);
    }
  }

  _leaveLobby(): void {
    this._lobbyFacade.leaveLobby();
  }

  _startGame(): void {
    this._gameFacade.startGame();
  }
}
