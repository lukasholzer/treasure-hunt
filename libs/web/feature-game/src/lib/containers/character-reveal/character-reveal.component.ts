import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GameFacade } from '@treasure-hunt/web/data-access';
import { delay, tap } from 'rxjs/operators';
import { CardComponent, HeaderComponent } from '../../components';
import { CardType } from '../../../../../../shared/interfaces/src';

@Component({
  selector: 'fg-character-reveal',
  templateUrl: './character-reveal.component.html',
  styleUrls: ['./character-reveal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterRevealComponent {

  @ViewChild(HeaderComponent, {static: true})
  header: HeaderComponent;

  player$ = this._gameFacade.player$;
  character$ = this._gameFacade.character$;
  revealed$ = this.character$.pipe(
    delay(1000),
    tap((character) => {
      this.header.avatar = character;
    })
  );

  constructor(private _gameFacade: GameFacade) {
    this._gameFacade.revealCharacter();
  }

  isGuardian(character: CardType): boolean {
    return character === CardType.Guardian;
  }
}
