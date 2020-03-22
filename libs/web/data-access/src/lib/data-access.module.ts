import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GameEffects } from './+state/game.effects';
import { GameFacade } from './+state/game.facade';
import * as fromGame from './+state/game.reducer';
import { GAME_FEATURE_KEY } from './+state/game.state';
import { DataFacade } from './data.facade';
import { EventService } from './services/event.service';
import { PlayerService } from './services/player.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(GAME_FEATURE_KEY, fromGame.reducer),
    EffectsModule.forFeature([GameEffects]),
  ],
  providers: [PlayerService, EventService, DataFacade, GameFacade],
})
export class DataAccessModule {}
