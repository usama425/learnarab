import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-taamarboeta',
  templateUrl: './taamarboeta.page.html',
  styleUrls: ['./taamarboeta.page.scss']
})
export class TaamarboetaPage implements OnInit {
  products: Product[] = [{ price: null }];

  
  constructor(
    public utilityService: UtilityService
  ) {
  }
  sound: string;
  audioTamarbuta: string;
  ngOnInit() {
    this.sound = "/sound/tamarbutavowels.m4a";
    this.audioTamarbuta = this.utilityService.serverUrlByFileName(this.sound);
  }

  playAudio(audioEvent) {
    this.utilityService.playAudio(audioEvent);
  }

}
