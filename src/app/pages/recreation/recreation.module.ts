import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecreationComponent } from './recreation.component';
import { RecreationRoutingModule } from './recreation-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    RecreationComponent
  ],
  imports: [
    CommonModule,
    RecreationRoutingModule,
    SharedModule
  ]
})
export class RecreationModule { }
