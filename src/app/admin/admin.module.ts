import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module'; 
import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';    
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat'; 
import { PartnershipsComponent } from './partnerships/partnerships.component';
import { MessagesComponent } from './messages/messages.component';
import { TeamComponent } from './team/team.component';
import { UploadDetailsComponent } from './team/upload-details/upload-details.component';
import { UploadFormComponent } from './team/upload-form/upload-form.component';
import { UploadListComponent } from './team/upload-list/upload-list.component';  
import { TimeagoFormatter } from 'ngx-timeago';
import { MemberEditComponent } from './team/member-edit/member-edit.component';
import { CareersComponent } from './careers/careers.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramEditComponent } from './programs/program-edit/program-edit.component';
import { ProgramUploadDetailsComponent } from './programs/program-upload-details/program-upload-details.component';
import { ProgramUploadFormComponent } from './programs/program-upload-form/program-upload-form.component';
import { ProgramUploadListComponent } from './programs/program-upload-list/program-upload-list.component';
import { SchoolsComponent } from './schools/schools.component';
import { SchoolEditComponent } from './schools/school-edit/school-edit.component';
import { SchoolUploadDetailsComponent } from './schools/school-upload-details/school-upload-details.component';
import { SchoolUploadFormComponent } from './schools/school-upload-form/school-upload-form.component';
import { SchoolUploadListComponent } from './schools/school-upload-list/school-upload-list.component';
import { RecreationComponent } from './recreation/recreation.component';
import { RecreationEditComponent } from './recreation/recreation-edit/recreation-edit.component';
import { RecreationUploadFormComponent } from './recreation/recreation-upload-form/recreation-upload-form.component';
import { VisitsComponent } from './visits/visits.component';
import { VisitsUploadFormComponent } from './visits/visits-upload-form/visits-upload-form.component';
import { VisitsEditComponent } from './visits/visits-edit/visits-edit.component';

@NgModule({
  declarations: [
    SigninComponent,
    PartnershipsComponent,
    MessagesComponent,
    TeamComponent,
    UploadDetailsComponent,
    UploadFormComponent,
    UploadListComponent,
    MemberEditComponent,
    CareersComponent,
    ProgramsComponent,
    ProgramEditComponent,
    ProgramUploadDetailsComponent,
    ProgramUploadFormComponent,
    ProgramUploadListComponent,
    SchoolsComponent,
    SchoolEditComponent,
    SchoolUploadDetailsComponent,
    SchoolUploadFormComponent,
    SchoolUploadListComponent,
    RecreationComponent,
    RecreationEditComponent,
    RecreationUploadFormComponent,
    VisitsComponent,
    VisitsUploadFormComponent,
    VisitsEditComponent 
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ] 
})
export class AdminModule { }
