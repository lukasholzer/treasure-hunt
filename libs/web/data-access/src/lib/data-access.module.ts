import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GameEffects } from './+state/game/game.effects';
import { GameFacade } from './+state/game/game.facade';
import { LobbyEffects } from './+state/lobby/lobby.effects';
import { LobbyFacade } from './+state/lobby/lobby.facade';
import { APP_FEATURE_KEY, reducers } from './+state/reducers';
import { AuthenticationGuard, GameGuard } from './guards';
import { GameService, LobbyService } from './services';
import { storageMetaReducer } from './storage.meta-reducer';

const localStorageKey = '_th_game-state';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(APP_FEATURE_KEY, reducers, {
      metaReducers: [
        storageMetaReducer(['lobby.player', 'lobby.lobbyName'], localStorageKey),
      ],
    }),
    EffectsModule.forFeature([GameEffects, LobbyEffects]),
  ],
  providers: [
    AuthenticationGuard,
    GameFacade,
    GameGuard,
    GameService,
    LobbyFacade,
    LobbyService,
  ],
})
export class DataAccessModule {}
