import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardType, Player } from '@treasure-hunt/api-interfaces';
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
  }

  _getBackgroundUrl(image: string): string {
    return `url(${image})`;
  }
}
