import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameFacade } from '@witch-hunter/web/data-access';

@Component({
  selector: 'fg-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOverviewComponent {
  player$ = this._gameFacade.player$;
  character$ = this._gameFacade.character$;
  activePlayers$ = this._gameFacade.activePlayers$;

  constructor(private _gameFacade: GameFacade) {}
}
