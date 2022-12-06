import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-hmza',
  templateUrl: './hmza.page.html',
  styleUrls: ['./hmza.page.scss']
})
export class HmzaPage implements OnInit {
  products: Product[] = [{ price: null }];

  constructor(
    public utilityService: UtilityService
  ) {
  }
  sound: string;
  sound2: string;
  audioHamzaShort: string;
  audioHamzaLong: string;
  ngOnInit() {
    this.sound = "/sound/hamzashort.m4a";
    this.sound2 = "/sound/hamzalong.m4a";
    this.audioHamzaShort = this.utilityService.serverUrlByFileName(this.sound);
    this.audioHamzaLong = this.utilityService.serverUrlByFileName(this.sound2);
  }

  playAudio(audioEvent) {
    this.utilityService.playAudio(audioEvent);
  }

}
