import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TimeagoModule } from 'ngx-timeago';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    DateAgoPipe,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[NavbarComponent,FooterComponent,SideNavComponent,TimeagoModule]
})
export class SharedModule { }
