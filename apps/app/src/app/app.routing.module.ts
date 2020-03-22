import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/lobby/login',
  },
  {
    path: 'game',
    loadChildren: () =>
      import('@witch-hunter/web/feature-game').then(
        module => module.FeatureGameModule,
      ),
  },
  {
    path: 'lobby',
    loadChildren: () =>
      import('@witch-hunter/web/feature-lobby').then(
        module => module.FeatureLobbyModule,
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
