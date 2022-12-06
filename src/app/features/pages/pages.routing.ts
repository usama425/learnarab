import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataResolverService } from 'src/app/core/resolver/data.resolver';

const routes: Routes = [
  {
    path: 'introduction',
    loadChildren: () => import('./introduction/introduction.module').then(m => m.IntroductionModule),
    data: {
      title: 'Introduction',
      directPage: true
    },
    resolve: {
      info: DataResolverService
    }
  },
  {
    path: 'buy',
    loadChildren: () => import('./buy/buy.module').then(m => m.BuyModule),
    data: {
      title: 'REMOVE ADS',
      directPage: true
    }
  },
  {
    path: 'learnvowels',
    loadChildren: () => import('./learn-vowels/learn-vowels.module').then(m => m.LearnVowelsModule),
    data: {
      title: 'Learn The Vowels',
      directPage: true
    },
    resolve: {
      info: DataResolverService
    }
  },
  {
    path: 'order-book',
    loadChildren: () => import('./order-book/order-book.module').then(m => m.OrderBookModule),
    data: {
      title: 'Order Book',
      directPage: true
    },
    resolve: {
      info: DataResolverService
    }
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule),
    data: {
      title: 'About Us',
      directPage: true
    },
    resolve: {
      info: DataResolverService
    }
  },
  {
    path: 'learnbylevels',
    loadChildren: () => import('./learn-by-levels/learn-by-levels.module').then(m => m.LearnByLevelsModule),
    data: {
      title: 'Learn by levels',
      directPage: true,
      showInfoIcon: true
    }
  },
  {
    path: 'levels/:firstLetter/:secondLetter/:thirdLetter',
    loadChildren: () => import('./levels/levels.module').then(m => m.LevelsModule),
    data: {
      title: 'Levels',
      showInfoIcon: true
    }
  },
  {
    path: 'learn/:letter',
    loadChildren: () => import('./learn/learn.module').then(m => m.LearnModule),
    data: {
      title: 'Learn'
    }
  },
  {
    path: 'leveltest/:letter',
    loadChildren: () => import('./leveltest/leveltest.module').then(m => m.leveltestModule),
    data: {
      title: 'Level test',
      showInfoIcon: false
    }
  },
  {
    path: 'madda',
    loadChildren: () => import('./madda/madda.module').then(m => m.MaddaModule),
    data: {
      title: 'Learn',
      directPage: false
    }
  },
  {
    path: 'alifmaqsoera',
    loadChildren: () => import('./alifmaqsoera/alifmaqsoera.module').then(m => m.AlifmaqsoeraModule),
    data: {
      title: 'Learn',
      directPage: false
    }
  },
  {
    path: 'hamza',
    loadChildren: () => import('./hamza/hmza.module').then(m => m.HmzaModule),
    data: {
      title: 'Learn',
      directPage: false
    }
  },
  {
    path: 'taamarboeta',
    loadChildren: () => import('./taamarboeta/taamarboeta.module').then(m => m.TaamarboetaModule),
    data: {
      title: 'Learn',
      directPage: false
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }