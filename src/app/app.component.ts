import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menuItems = environment.menuItems;
  profileUrl = 'https://picsum.photos/200/300';
  constructor(
    private router: Router,
    private camera: Camera,
    private actionSheet: ActionSheetController
    ) {}
  redirectTo(item) {
    this.router.navigate([item.route])
  }

  

  async openCamera(): Promise<string> {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 256,
      targetHeight: 256
    };
    return await this.getPicture(options);
  }
  
  async getPicture(options): Promise<any> {
    return new Promise((resolve, reject) => {
      this.camera.getPicture(options).then((url) => {
        const fileUrl = 'data:image/jpeg;base64,' + url;
        console.log('url', url);
        resolve(fileUrl);
      }).catch(err => {
        reject(err);
      });
    });
  }


  async openGallery(): Promise<string>  {
    const options: CameraOptions = {
      quality: 60,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 256,
      targetHeight: 256
    };
    return await this.getPicture(options);
  }

  async showActionSheet() {
    const action = await this.actionSheet.create({
      buttons: [
        {
          text: 'Take a Picture',
          role: 'destructive',
          cssClass: 'buttonCss',
          handler: async () =>  {
           const picture: any =  await this.openCamera();
           this.profileUrl = picture;
          }
        }, {
          text: 'Pick From Gallery',
          handler: async () => {
           const picture: any =  await this.openGallery();
           this.profileUrl = picture;
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'buttonCss_Cancel',
          handler: () => {
          }
        }
      ]
    });
    await action.present();
  }
}
