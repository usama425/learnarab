import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/core/services';

@Component({
  selector: 'app-alifmaqsoera',
  templateUrl: './alifmaqsoera.page.html',
  styleUrls: ['./alifmaqsoera.page.scss']
})
export class AlifmaqsoeraPage implements OnInit {

  constructor(
    public utilityService: UtilityService
  ) {
  }
  sound: string;
  audioAlifmaqsura: string;
  ngOnInit() {
    this.sound = "/sound/alifmaqsuravowels.m4a";
    this.audioAlifmaqsura = this.utilityService.serverUrlByFileName(this.sound);
  }

  playAudio(audioEvent) {
    this.utilityService.playAudio(audioEvent);
  }
}
