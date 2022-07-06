import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recreation',
  templateUrl: './recreation.component.html',
  styleUrls: ['./recreation.component.css']
})
export class RecreationComponent implements OnInit {
  programs!:any[];
  constructor(private auth:AuthService) {
    
    this.auth.getRecreations().subscribe(e=>{
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
