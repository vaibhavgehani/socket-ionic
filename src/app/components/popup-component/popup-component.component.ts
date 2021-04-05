import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popup-component',
  templateUrl: './popup-component.component.html',
  styleUrls: ['./popup-component.component.scss'],
})
export class PopupComponentComponent implements OnInit {
  @Input('data') data;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
