import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from './button';

@NgModule({
  imports: [CommonModule],
  declarations: [Button],
  exports: [Button],
})
export class ButtonModule {}
