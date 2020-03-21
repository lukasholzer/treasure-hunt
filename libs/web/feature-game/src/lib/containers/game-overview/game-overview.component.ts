import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'fg-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOverviewComponent implements OnInit {
  avatarImage = `url('/assets/adventurer.png')`;

  ngOnInit(): void {}
}
