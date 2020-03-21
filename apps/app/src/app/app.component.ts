import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { routerTransition } from './router-transition';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'witch-hunter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {
  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
