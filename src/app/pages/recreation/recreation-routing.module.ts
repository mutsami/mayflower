import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { RecreationComponent } from './recreation.component';

const routes: Routes = [{path:"",component:RecreationComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecreationRoutingModule { }
