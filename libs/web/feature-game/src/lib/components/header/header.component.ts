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
  selector: 'fg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomInOnEnterAnimation()],
})
export class HeaderComponent {
  /** Url for the avatar image */
  avatarUrl: string;

  @Input() player: Player;

  @Input()
  set avatar(type: CardType) {
    this.avatarUrl = `/assets/${getImageUrlForType(type)}.png`;
    this._changeDetectorRef.markForCheck();
  }

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}
}
