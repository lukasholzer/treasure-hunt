import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input
} from '@angular/core';
import { CardType } from '@treasure-hunt/shared/interfaces';
import { getImageUrlForType } from '../get-image-url-for-type';

@Component({
  selector: 'fg-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  /** Url for the cards background image */
  imageUrl: string;

  @HostBinding('class.is-flipped')
  @Input()
  flipped = false;

  /** States wether a card is flip able or not */
  @Input() locked = false;

  /** The card type */
  @Input()
  set type(type: CardType) {
    this.imageUrl = `url("/assets/${getImageUrlForType(type)}.png")`;
  }

  /** Flips a card to reveal its other side */
  @HostListener('click')
  flip(): void {
    if (!this.locked) {
      this.flipped = !this.flipped;
    }
  }
}
