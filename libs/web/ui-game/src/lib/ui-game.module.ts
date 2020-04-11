import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { Slider } from './slider/slider';
import { ClaimSlider } from './claim-slider';

const components = [
  AvatarComponent,
  CardComponent,
  HeaderComponent,
  Slider,
  ClaimSlider,
];

@NgModule({
  imports: [CommonModule],
  exports: [...components],
  declarations: [...components],
})
export class UiGameModule {}
