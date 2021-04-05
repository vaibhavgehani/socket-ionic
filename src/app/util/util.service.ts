import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private toastController: ToastController,
    private router: Router
    ) { }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2100
    });
    toast.present();
  }
  async navigate(route) {
    this.router.navigate([route]);
  }
}
