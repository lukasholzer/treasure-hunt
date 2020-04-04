import { ChangeDetectionStrategy, Component, Input, ChangeDetectorRef } from '@angular/core';
import { CardType, Player } from '@treasure-hunt/shared/interfaces';
import { getImageUrlForType } from '../get-image-url-for-type';

@Component({
  selector: 'fg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  /** Url for the avatar image */
  avatarUrl: string;

  @Input() player: Player;

  @Input()
  set avatar(type: CardType) {
    this.avatarUrl = this._getBackgroundUrl(
      `/assets/${getImageUrlForType(type)}.png`,
    );
    this._changeDetectorRef.markForCheck();
  }

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  _getBackgroundUrl(image: string): string {
    return `url(${image})`;
  }
}
