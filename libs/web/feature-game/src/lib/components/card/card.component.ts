import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  OnDestroy,
  HostBinding,
  ChangeDetectorRef
} from '@angular/core';
import { CardType } from '@witch-hunter/api-interfaces';
import { fromEventPattern, fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fg-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnDestroy {
  /** Url for the cards background image */
  imageUrl: string;

  private _destroy$ = new Subject<void>();

  @Input()
  set type(type: CardType) {
    this.imageUrl = `url("/assets/${getImageUrlForType(type)}.png")`;
  }

  constructor(elementRef: ElementRef<HTMLDivElement>) {
    fromEvent(elementRef.nativeElement, 'click')
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        elementRef.nativeElement.classList.toggle('is-flipped');
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

function getImageUrlForType(cardType: CardType): string {
  switch (cardType | 0) {
    case CardType.Adventurer:
      return 'adventurer';
    case CardType.Guardian:
      return 'guardian';
    case CardType.Fire:
      return 'fire';
    case CardType.Gold:
      return 'gold';
    case CardType.Empty:
      return 'empty';
  }
}
