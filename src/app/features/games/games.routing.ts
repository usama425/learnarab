import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataResolverService } from 'src/app/core/resolver/data.resolver';

const routes: Routes = [
  {
    path: 'readandlearn/:letter',
    loadChildren: () => import('./read-and-learn/read-and-learn.module').then(m => m.ReanAndLearnModule),
    data: {
      title: 'Read And Learn',
      showInfoIcon: true,
      showReloadIcon: true,
      showShuffleIcon: true,
      showFavoriteIcon: true
    },
    resolve: {
      info: DataResolverService
    }
  },
  {
    path: 'matchthewords/:letter',
    loadChildren: () => import('./match-word/match-the-word.module').then(m => m.MatchTheWordModule),
    data: {
      title: 'Match the word',
      showInfoIcon: true,
      gameIcons: true
    }
  },
  {
    path: 'wordpuzzle/:letter',
    loadChildren: () => import('./wordpuzzle/word-puzzle.module').then(m => m.WordPuzzleModule),
    data: {
      title: 'Word Puzzle',
      showInfoIcon: true,
      gameIcons: true
    },
    resolve: {
      info: DataResolverService
    }
  },
  {
    path: 'listenandpick/:letter',
    loadChildren: () => import('./listenandpick/listen-and-pick.module').then(m => m.ListenAndPickModule),
    data: {
      title: 'Listen & Pick',
      showInfoIcon: true,
      gameIcons: true
    },
    resolve: {
      info: DataResolverService
    }
  },
  {
    path: 'listenandsort/:letter',
    loadChildren: () => import('./listenandsort/listen-and-sort.module').then(m => m.ListenAndSortModule),
    data: {
      title: 'Listen And Sort',
      showInfoIcon: true,
      gameIcons: true
    },
    resolve: {
      info: DataResolverService
    }
  },
  {
    path: 'matchingletter/:letter',
    loadChildren: () => import('./matching-letter/matching-letter.module').then(m => m.MatchingLetterModule),
    data: {
      title: 'Matching Letter',
      showInfoIcon: true,
      gameIcons: true
    },
    resolve: {
      info: DataResolverService
    }
  },
  {
    path: 'translatesentence/:letter',
    loadChildren: () => import('./translatesentence/translatesentence.module').then(m => m.TranslateSentenceModule),
    data: {
      title: 'Translate',
      showInfoIcon: true,
      gameIcons: true
    },
    resolve: {
      info: DataResolverService
    }
  },
  {
    path: 'rightsentence/:letter',
    loadChildren: () => import('./rightsentence/rightsentence.module').then(m => m.RightSentenceModule),
    data: {
      title: 'Right Sentence',
      showInfoIcon: true,
      gameIcons: true
    },
    resolve: {
      info: DataResolverService
    }
  },
  {
    path: 'mixandmatch/:letter',
    loadChildren: () => import('./mixmatch/mixmatch.module').then(m => m.MixMatchModule),
    data: {
      title: 'Mix And Match',
      showInfoIcon: true,
      gameIcons: true
    },
    resolve: {
      info: DataResolverService
    }
  },
  {
    path: 'missingword/:letter',
    loadChildren: () => import('./missingword/missingword.module').then(m => m.MissingWordModule),
    data: {
      title: 'Missing Word',
      showInfoIcon: true,
      gameIcons: true
    },
    resolve: {
      info: DataResolverService
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }