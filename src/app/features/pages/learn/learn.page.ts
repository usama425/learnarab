import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Data } from '@angular/router';
import { GeneralInfo } from 'src/app/core/models/general-info.model';
import { UtilityService, DataService, ArabCharacterService } from 'src/app/core/services';
import { BaseGameService } from 'src/app/core/services/base-game.service';
import { InstructionModalComponent } from './instruction-modal/instruction-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-Learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
})
export class LearnPage implements OnInit {
  loading: boolean = true;
  words: any;
  data: GeneralInfo;

  largeSigns: string = 'س ش ص ض';

  letter: string;
  firstLetter: string;
  arabLetter: string;
  arabCssLetter: string;

  myfontsize: string;

  imageUrl: string;
  soundUrl: string;

  letterInfo: any = {};

  // special chars soundUrls
  audioHamzaShort: string = 'assets/sound/hamzashort.m4a';
  audioHamzaLong: string = 'assets/sound/hamzalong.m4a';
  audioMadda: string = 'assets/sound/maddavowels.m4a';
  audioAlifmaqsura: string = 'assets/sound/alifmaqsuravowels.m4a';
  audioTamarbuta: string = 'assets/sound/tamarbutavowels.m4a';

  routeParamSub$: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private utilityService: UtilityService,
    private arabCharacterService: ArabCharacterService,
    private dataService: DataService,
    private baseGameService: BaseGameService
  ) {
    
  }

  ngOnInit() {
    alert('Hello');
    this.routeParamSub$ = this.route.params.subscribe(params => {
      const { letter } = params;
      this.letter = decodeURIComponent(letter);

      this.getData();
    });
  }

  getData() {
    this.loading = true;
    this.data = this.route.snapshot.data.info as GeneralInfo;

    this.dataService.getLetterInfo().subscribe(data => {
      this.words = data;
      this.processLearn();

      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  processLearn() {
    this.letterInfo = this.baseGameService.getGameWordArray(this.words, this.letter)[0].meta;
    // add classname with a_ added cause classnames starting with a digit ar not allowed
    this.arabCssLetter = this.letterInfo.phonetic + " a_" + this.letterInfo.phonetic;
    //console.log(this.letterInfo);

    let { image, sound } = this.letterInfo;
    this.imageUrl = this.utilityService.serverUrlByFileName(image, true);
    this.soundUrl = this.utilityService.serverUrlByFileName(sound);

    if (this.largeSigns.indexOf(this.letter) === -1) {
      this.myfontsize = 'normal';
    } else {
      this.myfontsize = 'small';
    }
  }

  playAudio(audioEvent) {
    this.utilityService.playAudio(audioEvent);
  }

  openModal() {
    this.presentModal();
  };

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: InstructionModalComponent,
      componentProps: {
        imageUrl: this.imageUrl
      }
    });
    return await modal.present();
  }

  ngOnDestroy() {
    this.routeParamSub$.unsubscribe();
  }
}
