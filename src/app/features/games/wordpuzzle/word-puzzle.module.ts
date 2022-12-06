import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';
import { WordPuzzleRoutingModule } from './word-puzzle.routing';

import { WordPuzzlePage } from './word-puzzle.page';

@NgModule({
  imports: [
    IonicModule,
    
    SharedModule,
    WordPuzzleRoutingModule
  ],
  declarations: [WordPuzzlePage]
})
export class WordPuzzleModule {}
