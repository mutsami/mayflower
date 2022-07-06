import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
list:any;
users:any;
  constructor(public auth: AuthService) {
     // subscribe to the request data from our service
     auth.getMailList().subscribe((e:any) => {
      //Map the data to a more useable array
      this.list = e; 
       
    })
    auth.getUsers().subscribe((e:any) => {
      //Map the data to a more useable array
      this.users = e; 
       
    })
   }

  ngOnInit() {
  }

  verify(id: string,status: any){
    this.auth.updateUser(id,!status)
  }

}
