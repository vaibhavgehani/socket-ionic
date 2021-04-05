import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private angularFire: AngularFirestore,
    private angularAuth: AngularFireAuth
    ) { }

  async loginWithDetails(userDetails) {
    return new Promise((resolve, reject) => {
      this.angularAuth.signInWithEmailAndPassword(userDetails.email, userDetails.password)
      .then((res) => {
        resolve(res.user);
      }).catch((error) => {
        reject(error);
      })
    });
  }

  async submitDataToFirebase(username, password) {
    return await this.angularFire.collection('users').add({username, password});
  }

  async signupUsingFirebase(userDetails) {
    return new Promise((resolve, reject) => {
      this.angularAuth.createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .then((res) => {
        console.log('Data', res);
        resolve(res.user);
      }).catch((err) => {
        reject(err);
      })
    });
  }
  async createUserInfo(userData) {
    const userinfo = {
      id: userData.uid,
      email: userData.email,
      name: userData.name,
      password: userData.password
    }
    return await this.angularFire.doc(`users/${userinfo.id}`).set(userinfo);
  }
  async getUserInfo(userid) {
    return this.angularFire.doc(`users/${userid}`).valueChanges().pipe(take(1))
  }
}
