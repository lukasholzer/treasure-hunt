import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CardType } from '@treasure-hunt/shared/interfaces';

@Component({
  selector: 'ui-claim-slider',
  templateUrl: './claim-slider.html',
  styleUrls: ['./claim-slider.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ClaimSlider {
  @Output() claimed = new EventEmitter<number>();

  @Input() type: CardType;

  value = 0;

  _valueChanged(event: number) {
    this.value = event;
    this.claimed.emit(event);
  }

  _getTypeDisplay(): string {
    switch (this.type) {
      case CardType.Gold:
        return '👑';
      case CardType.Fire:
        return '🔥';
    }
  }
}
