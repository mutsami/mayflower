import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnershipRoutingModule } from './partnership-routing.module';
import { PartnershipComponent } from './partnership.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat'; 
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PartnershipComponent
  ],
  imports: [
    CommonModule,
    PartnershipRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule

  ]
})
export class PartnershipModule { }
