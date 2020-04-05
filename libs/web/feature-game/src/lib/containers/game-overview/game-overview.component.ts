import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameFacade, LobbyFacade } from '@treasure-hunt/web/data-access';

@Component({
  selector: 'fg-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOverviewComponent {
  player$ = this._lobbyFacade.player$;
  character$ = this._gameFacade.character$;
  activePlayers$ = this._lobbyFacade.activePlayers$;

  constructor(
    private _lobbyFacade: LobbyFacade,
    private _gameFacade: GameFacade,
  ) {}
}
