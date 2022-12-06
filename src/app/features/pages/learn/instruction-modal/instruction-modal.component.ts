import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-instruction-modal',
  templateUrl: './instruction-modal.component.html',
  styleUrls: ['./instruction-modal.component.scss'],
})
export class InstructionModalComponent {
  @Input() imageUrl: string;

  constructor(public modalCtrl: ModalController) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
