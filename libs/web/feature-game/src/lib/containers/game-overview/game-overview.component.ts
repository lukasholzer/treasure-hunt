import { ChangeDetectionStrategy, Component, OnInit, SimpleChanges } from '@angular/core';
import { GameFacade, LobbyFacade } from '@treasure-hunt/web/data-access';
import { Countdown } from '../../services/countdown.service';

@Component({
  selector: 'fg-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Countdown],
})
export class GameOverviewComponent {
  player$ = this._lobbyFacade.player$;
  players$ = this._gameFacade.players$;
  role$ = this._gameFacade.role$;
  hand$ = this._gameFacade.hand$;

  constructor(
    private _lobbyFacade: LobbyFacade,
    private _gameFacade: GameFacade,
    private _countdown: Countdown,
  ) {
    // this._countdown.open()
  }

  _claimHand() {
    console.log('claim hand!')
  }
}
