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
  selector: 'button[gc-button], a[gc-button]',
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[attr.tabindex]': '0',
    '[disabled]': 'disabled || null',
  },
})
export class Button {

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
