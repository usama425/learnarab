import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './shared/layout/layout.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    component: LayoutPage,
    children: [{
      path: 'pages',
      loadChildren: () => import('./features/pages/pages.module').then(m => m.PagesModule),
    },
    {
      path: 'games',
      loadChildren: () => import('./features/games/games.module').then(m => m.GamesModule),
    },]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
