import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { defer, fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'fl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('input', { static: true })
  input: ElementRef<HTMLInputElement>;

  image$: Observable<any> = defer(() =>
    fromEvent<KeyboardEvent>(this.input.nativeElement, 'keydown').pipe(
      startWith('neutral'),
      debounceTime(200),
      map(
        () =>
          `url(https://api.adorable.io/avatars/285/${this.input.nativeElement.value})`,
      ),
      distinctUntilChanged(),
      tap(() => this._changeDetectorRef.markForCheck()),
    ),
  );

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // this.image$ = ;
  }
}
