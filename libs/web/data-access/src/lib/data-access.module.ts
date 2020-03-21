import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PlayerService } from './services/player.service';
import { DataFacade } from './data.facade';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [PlayerService, DataFacade]
})
export class DataAccessModule {}
