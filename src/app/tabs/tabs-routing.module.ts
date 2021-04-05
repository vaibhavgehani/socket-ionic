import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'notification',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'outbox',
        children: [
          {
            path: '',
            loadChildren: () => import('../inbox/inbox.module').then(m => m.InboxPageModule)
          }
        ]
      },
      {
        path: 'inbox',
        children: [
          {
            path: '',
            loadChildren: () => import('../inbox/inbox.module').then(m => m.InboxPageModule)
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
