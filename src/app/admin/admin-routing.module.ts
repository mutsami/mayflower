import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { CareersComponent } from './careers/careers.component';
import { MessagesComponent } from './messages/messages.component';
import { PartnershipsComponent } from './partnerships/partnerships.component';
import { ProgramEditComponent } from './programs/program-edit/program-edit.component';
import { ProgramsComponent } from './programs/programs.component';
import { RecreationEditComponent } from './recreation/recreation-edit/recreation-edit.component';
import { RecreationComponent } from './recreation/recreation.component';
import { SchoolEditComponent } from './schools/school-edit/school-edit.component';
import { SchoolsComponent } from './schools/schools.component';
import { SigninComponent } from './signin/signin.component'; 
import { MemberEditComponent } from './team/member-edit/member-edit.component';
import { TeamComponent } from './team/team.component';
import { VisitsEditComponent } from './visits/visits-edit/visits-edit.component';
import { VisitsComponent } from './visits/visits.component';
const routes: Routes = [
  {
    path:"",component:SigninComponent
  },
  {path:"message",component:MessagesComponent,
  canActivate: [AuthGuard] },  
  {path:"team",component:TeamComponent},
  {path:"careers",component:CareersComponent,
  canActivate: [AuthGuard] },
  {path:"team/:id",component:MemberEditComponent,
  canActivate: [AuthGuard] },   
  {path:"partnerships",component:PartnershipsComponent,
  canActivate: [AuthGuard] },   
  {path:"schools",component:SchoolsComponent,
  canActivate: [AuthGuard] },
  {path:"schools/:id",component:SchoolEditComponent,
  canActivate: [AuthGuard] },   
  {path:"programs",component:ProgramsComponent,
  canActivate: [AuthGuard] },
  {path:"programs/:id",component:ProgramEditComponent,
  canActivate: [AuthGuard] },   
  {path:"recreation",component:RecreationComponent,
  canActivate: [AuthGuard] },
  {path:"recreation/:id",component:RecreationEditComponent,
  canActivate: [AuthGuard] },   
  {path:"visits",component:VisitsComponent,
  canActivate: [AuthGuard] },
  {path:"visits/:id",component:VisitsEditComponent,
  canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
