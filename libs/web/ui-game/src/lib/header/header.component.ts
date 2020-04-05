import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { CardType, Player } from '@treasure-hunt/shared/interfaces';
import { getImageUrlForType } from '../get-image-url-for-type';
import { zoomInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomInOnEnterAnimation()],
})
export class HeaderComponent {
  /** Url for the avatar image */
  avatarUrl: string | null = null;

  @Input()
  get player(): Player {
    return this._player;
  }
  set player(player: Player) {
    this._player = player;
    this._changeDetectorRef.markForCheck();
  }
  private _player: Player;

  @Input()
  set avatar(type: CardType) {
    this.avatarUrl = null;
    // tslint:disable-next-line: no-bitwise
    if (Boolean(type & CardType.Characters)) {
      this.avatarUrl = `/assets/${getImageUrlForType(type)}.png`;
    }
    this._changeDetectorRef.markForCheck();
  }

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}
}
