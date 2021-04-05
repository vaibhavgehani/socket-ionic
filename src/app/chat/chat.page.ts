import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { DataService } from '../data/data.service';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  message = '';
  messages = [];
  currentUser = '';
  constructor(
    private socket: Socket,
    private util: UtilService,
    private data: DataService
    ) { }

  ngOnInit() {
    this.socket.connect();
    
    this.currentUser = this.data.userData.email;

    this.socket.emit('set-name', this.data.userData.email);
    this.socket.fromEvent('users-changed').subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.util.showToast('User left: ' + user);
      } else {
        this.util.showToast('User joined: ' + user);
      }
    });

    this.socket.fromEvent('message').subscribe(message => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    this.socket.emit('send-message', { text: this.message });
    this.message = '';
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

}
