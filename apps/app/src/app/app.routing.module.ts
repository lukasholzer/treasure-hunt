import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/client',
  },
  // {
  //   path: 'game',
  //   loadChildren: () =>
  //     import('@treasure-hunt/web/feature-game').then(
  //       module => module.FeatureGameModule,
  //     ),
  // },
  // {
  //   path: 'lobby',
  //   loadChildren: () =>
  //     import('@treasure-hunt/web/feature-lobby').then(
  //       module => module.FeatureLobbyModule,
  //     ),
  // },
  {
    path: 'client',
    loadChildren: () =>
      import('../client/client.module').then(
        module => module.ClientModule,
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      paramsInheritanceStrategy: 'always',
      enableTracing: false, // Can be set for debugging the router
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
