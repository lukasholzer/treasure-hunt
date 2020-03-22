import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'button[gc-button], a[gc-button]',
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[attr.tabindex]': '0',
  },
})
export class Button {}
