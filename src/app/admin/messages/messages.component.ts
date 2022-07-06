import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  form!: FormGroup;
  messages!:any[];
  constructor(private _router: Router,private formBuilder: FormBuilder,public auth:AuthService,private notifyService : NotificationService) {
    
    this.auth.getMessages().subscribe(e=>{
      this.messages = e;
    })
   }

  ngOnInit(): void {
  }

}
