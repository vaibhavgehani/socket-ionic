import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  templateUrl: './lifecycle.page.html',
  styleUrls: ['./lifecycle.page.scss'],
})
export class LifecyclePage implements OnInit {

  constructor() {
    console.log('Constructor call');
   }

  ngOnInit() {
    console.log('Begin Navigation');
  }
  ionViewWillEnter() {
    console.log('Begin Page Transition');
  }
  ionViewDidEnter() {
    console.log('Page Fully Transitioned');
  }
  ionViewWillLeave() {
    console.log('Begin Transition to new Page');
  }
  ionViewDidLeave() {
    console.log('New Page Transition ends');
  }
  ngOnDestroy() {
    console.log('Previous Page Popped');
  }
}
