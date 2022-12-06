import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordPuzzlePage } from './word-puzzle.page';

const routes: Routes = [
  {
    path: '',
    component:  WordPuzzlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  WordPuzzleRoutingModule {}
