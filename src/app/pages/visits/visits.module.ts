import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitsComponent } from './visits.component';
import { VisitsRoutingModule } from './visits-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    VisitsComponent
  ],
  imports: [
    CommonModule,
    VisitsRoutingModule,
    SharedModule
  ]
})
export class VisitsModule { }
