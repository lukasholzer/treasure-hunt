import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';

const components = [AvatarComponent];

@NgModule({
  imports: [CommonModule],
  exports: [...components],
  declarations: [...components],
})
export class UiGameModule {}
