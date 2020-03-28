import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { GameFacade } from '@treasure-hunt/web/data-access';
import { defer, fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';

@Component({
  selector: 'fl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  /** The input element for the name */
  @ViewChild('input', { static: true })
  input: ElementRef<HTMLInputElement>;

  /** The stream with the current image for the name */
  image$: Observable<any> = defer(() =>
    fromEvent<KeyboardEvent>(this.input.nativeElement, 'keydown').pipe(
      startWith('neutral'),
      debounceTime(200),
      map(() => `url(${this._getImageUrl(this.input.nativeElement.value)})`),
      distinctUntilChanged(),
    ),
  );

  constructor(private _gameFacade: GameFacade) {}

  /** Is dispatching a login action with the generated image and the name */
  login(): void {
    const name = this.input.nativeElement.value;
    const image = this._getImageUrl(name);
    this._gameFacade.login(name, image);
  }

  /** Get a funny image for a provided name */
  private _getImageUrl(name: string): string {
    return `https://api.adorable.io/avatars/285/${name}`;
  }
}
