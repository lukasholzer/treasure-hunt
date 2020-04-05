import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { PlayerListComponent } from './player-list/player-list.component';

const components = [
  AvatarComponent,
  CardComponent,
  HeaderComponent,
  PlayerListComponent,
];

@NgModule({
  imports: [CommonModule],
  exports: [...components],
  declarations: [...components],
})
export class UiGameModule {}
