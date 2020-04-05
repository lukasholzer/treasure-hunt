import { ChangeDetectionStrategy, Component, OnInit, SimpleChanges } from '@angular/core';
import { GameFacade, LobbyFacade } from '@treasure-hunt/web/data-access';

@Component({
  selector: 'fg-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOverviewComponent {
  player$ = this._lobbyFacade.player$;
  activePlayers$ = this._lobbyFacade.activePlayers$;
  character$ = this._gameFacade.character$;
  hand$ = this._gameFacade.hand$;

  constructor(
    private _lobbyFacade: LobbyFacade,
    private _gameFacade: GameFacade,
  ) {}


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
}
