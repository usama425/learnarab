import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { map } from 'rxjs/operators';
import { RouteData } from 'src/app/core/models';

import { EventService } from 'src/app/core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
  @ViewChild('router', { static: true })
  private routerOutlet: RouterOutlet;

  @ViewChild("layoutContent", { static: true }) ionContent: IonContent;

  routeData: RouteData;
  currentScore: number = 0;
  gameInfoActive: boolean = false;
  pageSlug: string;

  routerOutletSub$: Subscription;
  eventScoreNumberSub$: Subscription;

  constructor(
    private router: Router,
    private eventService: EventService
  ) {
    this.eventScoreNumberSub$ = this.eventService.onScoreChanged.subscribe(score => {
      this.currentScore = score;
    });
  }

  ngOnInit() {
    this.routerOutletSub$ = this.routerOutlet.activateEvents.pipe(
      map(() => this.routerOutlet.activatedRouteData)
    ).subscribe((data) => {
      this.extractPageSlug();
      this.routeData = data as RouteData;
      this.routeData.pageSlug = this.pageSlug;
    });
  }

  extractPageSlug() {
    let currentUrl = this.router.url;
    let urlArr = currentUrl.split('/').filter(x => x);
    this.pageSlug = urlArr.length > 1 ? urlArr[1] : null;
  }

  scrollTop(e) {
    this.ionContent.scrollToTop(300);
  }

  toggleInfo($event) {
    this.gameInfoActive = !this.gameInfoActive;
  }

  hideGameInfo(e) {
    this.gameInfoActive = false;
  }

  ngOnDestroy() {
    this.routerOutletSub$.unsubscribe();
    this.eventScoreNumberSub$.unsubscribe();
  }

}
