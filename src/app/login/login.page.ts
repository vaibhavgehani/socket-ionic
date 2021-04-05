import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data/data.service';
import { ApiService } from '../services/api.service';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public signupDetails = { name: null, email: null, password: null };
  public loginDetails = { email: null, password: null}
  constructor(
    private authService: AuthService,
    private api: ApiService,
    private util: UtilService,
    private data: DataService
  ) { }

  ngOnInit() {
  }

  login() {
    this.api.loginWithDetails(this.loginDetails).then(async (user: any) => {
      if (user) {
        this.util.showToast('Successfully Login');
        (await this.api.getUserInfo(user.uid)).subscribe((userInfo: any) => {
          console.log(userInfo);
          this.data.userData.name = userInfo.name;
          this.data.userData.email = userInfo.email;
          this.util.navigate('tabs');
        });
      }
    }).catch((error) => {
      this.util.showToast(`${error}`)
    });
  }

  signup() {
    if (this.signupDetails.email && this.signupDetails.name && this.signupDetails.password) {
      this.api.signupUsingFirebase(this.signupDetails).then((data: any) => {
        if(data.uid) {
          this.api.createUserInfo({...data, name: this.signupDetails.name, password:this.signupDetails.password, email: this.signupDetails.email})
          .then(() => {
            this.data.userData.name = this.signupDetails.name;
            this.data.userData.email = this.signupDetails.email;
            this.util.showToast('Successfully Registerd');
            this.util.navigate('tabs');
          });
        }
      }).catch((error) =>{
        this.util.showToast(`${error}`);
      })
    } else {
      this.util.showToast('Enter all details');
    }
  }

}
