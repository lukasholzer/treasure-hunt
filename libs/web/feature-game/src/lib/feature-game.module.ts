import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameOverviewComponent } from './containers';
import { CardComponent, HeaderComponent } from './components';
import { DataAccessModule } from '@witch-hunter/web/data-access';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { GameLobbyComponent } from './containers/game-lobby/game-lobby.component';

@NgModule({
  imports: [
    CommonModule,
    DataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GameOverviewComponent },
      { path: 'lobby', component: GameLobbyComponent }
    ])
  ],
  declarations: [
    GameOverviewComponent,
    CardComponent,
    HeaderComponent,
    PlayerListComponent,
    GameLobbyComponent
  ]
})
export class FeatureGameModule {}
