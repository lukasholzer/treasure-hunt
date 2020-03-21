import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataFacade } from '@witch-hunter/web/data-access';

@Component({
  selector: 'fg-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameLobbyComponent {

}
