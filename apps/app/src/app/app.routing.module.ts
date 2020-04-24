import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/lobby',
  },
  {
    path: 'game',
    loadChildren: () =>
      import('@treasure-hunt/web/feature-game').then(
        module => module.FeatureGameModule,
      ),
  },
  {
    path: 'lobby',
    loadChildren: () =>
      import('@treasure-hunt/web/feature-lobby').then(
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
