import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromGame from './+state/game/game.reducer';
import { GameEffects } from './+state/game/game.effects';
import { GameFacade } from './+state/game/game.facade';
import { GAME_FEATURE_KEY } from './+state/game/game.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ClientComponent }]),
    StoreModule.forFeature(GAME_FEATURE_KEY, fromGame.reducer),
    EffectsModule.forFeature([GameEffects]),
  ],
  exports: [],
  providers: [GameFacade],
  declarations: [ClientComponent],
})
export class ClientModule {}
