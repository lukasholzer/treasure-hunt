import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { animationFrameScheduler, fromEvent, merge } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  observeOn,
  pluck,
  share,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  createEvents,
  getSliderPositionBasedOnValue,
  getSliderValueForCoordinate,
} from './utils';

@Component({
  selector: 'ui-slider',
  templateUrl: './slider.html',
  styleUrls: ['./slider.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class Slider implements OnInit {
  @Output() valueChanged = new EventEmitter<number>();

  @Input() min = 0;
  @Input() max = 8;
  @Input() step = 1;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
    this._changeDetectorRef.markForCheck();
  }
  private _disabled;

  @ViewChild('knob', { static: true })
  _knob: ElementRef<HTMLElement>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
  ) {}

  ngOnInit(): void {
    const {
      top,
      height,
    } = this._elementRef.nativeElement.getBoundingClientRect();

    const start$ = createEvents(this._elementRef.nativeElement, [
      'mousedown',
      'touchstart',
    ]);

    const move$ = createEvents(window, ['mousemove', 'touchmove']).pipe(
      map(event =>
        event instanceof TouchEvent
          ? event.changedTouches[0].clientY
          : event.clientY,
      ),
    );

    const end$ = createEvents(window, ['mouseup', 'touchend']);

    const click$ = fromEvent<MouseEvent>(
      this._elementRef.nativeElement,
      'click',
    ).pipe(pluck('clientY'));

    const drag$ = start$.pipe(
      switchMap(() =>
        move$.pipe(
          distinctUntilChanged(),
          observeOn(animationFrameScheduler),
          takeUntil(end$),
        ),
      ),
      share(),
    );

    merge(drag$, click$)
      .pipe(
        map(coordinate =>
          getSliderValueForCoordinate({
            coordinate,
            offset: top,
            width: height,
            min: this.min,
            max: this.max,
            step: this.step,
          }),
        ),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        const position = getSliderPositionBasedOnValue(
          value,
          this.min,
          this.max,
        );
        const percent = position * 100;

        this.valueChanged.emit(value);
        this._knob.nativeElement.style.transform = `translate3d(0, -${percent}%, 0)`;
      });
  }
}
