import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [{path:"",component:HomeComponent} ,
{
  path: 'partnership',
  loadChildren: () => import('./pages/partnership/partnership.module').then(m => m.PartnershipModule)
},
{
  path: 'team',
  loadChildren: () => import('./pages/team/team.module').then(m => m.TeamModule)
},
{
  path: 'donations',
  loadChildren: () => import('./pages/donations/donations.module').then(m => m.DonationsModule)
},
{
  path: 'schools',
  loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule)
},
{
  path: 'recreation',
  loadChildren: () => import('./pages/recreation/recreation.module').then(m => m.RecreationModule)
},
{
  path: 'visits',
  loadChildren: () => import('./pages/visits/visits.module').then(m => m.VisitsModule)
},
{
  path: 'contact',
  loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
},
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
