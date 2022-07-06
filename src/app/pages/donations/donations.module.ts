import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationsRoutingModule } from './donations-routing.module';
import { DonationsComponent } from './donations.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DonationsComponent
  ],
  imports: [
    CommonModule,
    DonationsRoutingModule,
    SharedModule
  ]
})
export class DonationsModule { }
