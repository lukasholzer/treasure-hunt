import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@treasure-hunt/web/components/button';
import {
  AuthenticationGuard,
  DataAccessModule,
  GameGuard,
} from '@treasure-hunt/web/data-access';
import { UiGameModule } from '@treasure-hunt/web/ui-game';
import { GameOverviewComponent } from './containers';
import { CharacterRevealComponent } from './containers/character-reveal/character-reveal.component';

@NgModule({
  imports: [
    CommonModule,
    DataAccessModule,
    ButtonModule,
    UiGameModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: GameOverviewComponent,
        canActivate: [GameGuard],
      },
      {
        path: 'character',
        pathMatch: 'full',
        component: CharacterRevealComponent,
        canActivate: [AuthenticationGuard, GameGuard],
      },
    ]),
  ],
  declarations: [GameOverviewComponent, CharacterRevealComponent],
})
export class FeatureGameModule {}
