import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController, ModalController } from '@ionic/angular';
import { PopupComponentComponent } from '../components/popup-component/popup-component.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  relatedArticles = environment.userData;
  modal: HTMLIonModalElement;
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private modalContoller: ModalController
    ) {}

  async ngOnInit() {
  }
  async loadMoreData($event) {
    setTimeout(() => {
      $event.target.complete();
      const item1 = this.relatedArticles[Math.floor(Math.random() * this.relatedArticles.length)];
      const item2= this.relatedArticles[Math.floor(Math.random() * this.relatedArticles.length)]
      this.relatedArticles.push(item1);
      this.relatedArticles.push(item2);

      if (this.relatedArticles.length > 20) {
        $event.target.disabled = true;
      }
    }, 600);
  }
  trimData(email) {
      return email.length > 5 ? email.substring(0, 5) + '...' : email; 
  }
  updateShowMore(i) {
    this.relatedArticles[i].showMore = this.relatedArticles[i].showMore ? false: true; 
  }
  async getInfo(info, i) {
    this.relatedArticles[i].readed = true;
    this.modal = await this.modalContoller.create({
      component: PopupComponentComponent,
      cssClass: 'backTransparent',
      backdropDismiss: false,
      componentProps: { data: info}
    });
    this.modal.present();
  }
}
