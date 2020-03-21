import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PlayerService } from './services/player.service';
import { DataFacade } from './data.facade';
import { EventService } from './services/event.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [PlayerService, EventService, DataFacade]
})
export class DataAccessModule {}
