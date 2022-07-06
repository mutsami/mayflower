import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.css']
})
export class PartnershipsComponent implements OnInit { 
  form!: FormGroup;
  partnerships!:any[];
  constructor(private _router: Router,private formBuilder: FormBuilder,public auth:AuthService,private notifyService : NotificationService) {
    
    this.auth.getPartnerships().subscribe(e=>{
      this.partnerships = e;
    })
   }

  ngOnInit() {
  }

}
