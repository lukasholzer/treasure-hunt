import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule, GameGuard, AuthenticationGuard } from '@treasure-hunt/web/data-access';
import { CardComponent, HeaderComponent } from './components';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { GameOverviewComponent } from './containers';
import { CharacterRevealComponent } from './containers/character-reveal/character-reveal.component';

@NgModule({
  imports: [
    CommonModule,
    DataAccessModule,
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
  declarations: [
    CardComponent,
    HeaderComponent,
    PlayerListComponent,
    GameOverviewComponent,
    CharacterRevealComponent,
  ],
})
export class FeatureGameModule {}
