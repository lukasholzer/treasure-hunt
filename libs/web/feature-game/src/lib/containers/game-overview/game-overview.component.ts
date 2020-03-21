import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataFacade } from '@witch-hunter/web/data-access';

@Component({
  selector: 'fg-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOverviewComponent {
  player$ = this.dataFacade.player$;

  constructor(private dataFacade: DataFacade) {}
}
