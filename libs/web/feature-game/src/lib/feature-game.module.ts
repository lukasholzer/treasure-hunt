import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@witch-hunter/web/data-access';
import { CardComponent, HeaderComponent } from './components';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { GameOverviewComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    DataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GameOverviewComponent },
    ]),
  ],
  declarations: [
    GameOverviewComponent,
    CardComponent,
    HeaderComponent,
    PlayerListComponent,
    GameLobbyComponent,
  ],
})
export class FeatureGameModule {}
