import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameOverviewComponent } from './containers';
import { CardComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GameOverviewComponent }
    ])
  ],
  declarations: [GameOverviewComponent, CardComponent]
})
export class FeatureGameModule {}
