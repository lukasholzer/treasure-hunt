import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ClientComponent }]),
  ],
  exports: [],
  providers: [],
  declarations: [ClientComponent],
})
export class ClientModule {}
