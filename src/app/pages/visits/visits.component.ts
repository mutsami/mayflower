import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
  programs!:any[];
  bool = true;
  constructor(private auth:AuthService) {
    
    this.auth.getVisits().subscribe(e=>{
      this.programs = e; 
    })
   }

  ngOnInit() {
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
}
onImgError(event: any){
  console.log('trans')
  event.target.src = './assets/trans.png'
 //Do other stuff with the event.target
 }
}
