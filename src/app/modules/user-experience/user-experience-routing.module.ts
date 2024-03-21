import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketComponent } from './market/market.component';
import { MyListComponent } from './my-list/my-list.component';

const routes: Routes = [
  {
    path: 'market',
    component: MarketComponent
  },
  {
    path: 'my-list',
    component: MyListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserExperienceRoutingModule { }
