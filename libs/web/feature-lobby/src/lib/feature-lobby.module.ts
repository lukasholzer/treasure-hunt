import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@treasure-hunt/web/components/button';
import {
  AuthenticationGuard,
  DataAccessModule,
} from '@treasure-hunt/web/data-access';
import { UiGameModule } from '@treasure-hunt/web/ui-game';
import { LobbyComponent } from './containers';
import { LoginComponent } from './containers/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataAccessModule,
    ButtonModule,
    UiGameModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: LobbyComponent,
        canActivate: [AuthenticationGuard],
      },
      { path: 'login', component: LoginComponent },
    ]),
  ],
  declarations: [LoginComponent, LobbyComponent],
})
export class FeatureLobbyModule {}
