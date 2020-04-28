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
  lobbyMembers$ = this._lobbyFacade.lobbyMembers$;
  player$ = this._lobbyFacade.player$;
  lobby$ = this._lobbyFacade.lobbyName$;
  gameReady$ = this._lobbyFacade.gameReady$;

  constructor(
    private _lobbyFacade: LobbyFacade,
    private _gameFacade: GameFacade,
  ) {}

  _joinLobby(): void {
    if (this.lobbyName.length) {
      this._lobbyFacade.joinLobby(this.lobbyName);
    }
  }

  _leaveLobby(): void {
    this._lobbyFacade.leaveLobby();
  }

  _logout(): void {
    this._lobbyFacade.logout();
  }

  _startGame(): void {
    this._gameFacade.startGame();
  }
}
