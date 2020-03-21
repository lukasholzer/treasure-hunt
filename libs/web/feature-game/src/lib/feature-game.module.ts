import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameOverviewComponent } from './containers';
import { CardComponent, HeaderComponent } from './components';
import { EventService } from './event.service';
import { DataAccessModule } from '@witch-hunter/web/data-access';

@NgModule({
  imports: [
    CommonModule,
    DataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GameOverviewComponent }
    ])
  ],
  declarations: [GameOverviewComponent, CardComponent, HeaderComponent],
  providers: [EventService]
})
export class FeatureGameModule {}
