import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
  ChangeDetectorRef,
  HostBinding,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'ui-slider',
  templateUrl: './slider.html',
  styleUrls: ['./slider.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class Slider {

  @Input() min = 0;
  @Input() max = 10;
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

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}
}
