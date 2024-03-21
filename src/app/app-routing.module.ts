import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('./modules/adm/adm.module').then(m => m.AdmModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user-experience/user-experience.module').then(m => m.UserExperienceModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
