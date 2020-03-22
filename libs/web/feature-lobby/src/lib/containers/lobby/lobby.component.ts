import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { EMPTY, fromEvent, Observable, of, defer } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, startWith } from 'rxjs/operators';

@Component({
  selector: 'fl-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent implements AfterViewInit {
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
