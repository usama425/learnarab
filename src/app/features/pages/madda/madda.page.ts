import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-madda',
  templateUrl: './madda.page.html',
  styleUrls: ['./madda.page.scss']
})
export class MaddaPage implements OnInit {
  
  constructor(
    public utilityService: UtilityService
  ) {
  }
  sound: string;
  audioMadda: string;
  ngOnInit() {
    this.sound = "/sound/maddavowels.m4a";
    this.audioMadda = this.utilityService.serverUrlByFileName(this.sound);
  }

  playAudio(audioEvent) {
    this.utilityService.playAudio(audioEvent);
  }
}
