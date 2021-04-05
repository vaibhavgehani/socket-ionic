import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  username = '';
  password = '';
  constructor(
    private api: ApiService,
    private util: UtilService
  ) { }

  ngOnInit() {
  }
  clearInputs() {
    this.username = '';
    this.password = '';
  }
  async submitData() {
    if (this.username && this.password) {
      const result = await this.api.submitDataToFirebase(this.username, this.password);
      this.clearInputs();
      this.util.showToast('Updated in firebase');
    }
  }
}
