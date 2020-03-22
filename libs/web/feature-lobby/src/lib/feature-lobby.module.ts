import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LobbyComponent } from './containers';
import { ButtonModule } from '@witch-hunter/web/components/button';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LobbyComponent },
    ]),
  ],
  declarations: [LobbyComponent],
})
export class FeatureLobbyModule {}
