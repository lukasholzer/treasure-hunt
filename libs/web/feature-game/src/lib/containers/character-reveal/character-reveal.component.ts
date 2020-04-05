import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CardType } from '@treasure-hunt/shared/interfaces';
import { GameFacade } from '@treasure-hunt/web/data-access';
import { delay, tap, take, filter } from 'rxjs/operators';
import { HeaderComponent } from '@treasure-hunt/web/ui-game';
import { Router } from '@angular/router';
import { zoomInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'fg-character-reveal',
  templateUrl: './character-reveal.component.html',
  styleUrls: ['./character-reveal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomInOnEnterAnimation()],
})
export class CharacterRevealComponent {
  @ViewChild(HeaderComponent, { static: true })
  header: HeaderComponent;

  player$ = this._gameFacade.player$;
  character$ = this._gameFacade.character$;
  revealed$ = this.character$.pipe(
    filter(Boolean),
    delay(1000),
    tap((character: CardType) => {
      this.header.avatar = character;
    }),
  );

  constructor(private _gameFacade: GameFacade, private _router: Router) {
    this._gameFacade.revealCharacter();

    this.revealed$.pipe(delay(4000), take(1)).subscribe(() => {
      this._router.navigate(['/game']);
    });
  }

  isGuardian(character: CardType): boolean {
    return character === CardType.Guardian;
  }
}
