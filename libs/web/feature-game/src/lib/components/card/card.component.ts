import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import { CardType } from '@witch-hunter/api-interfaces';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getImageUrlForType } from '../get-image-url-for-type';

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
