import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  programs!:any[];
  video:boolean = false;
  img:boolean = false;
  constructor(private auth:AuthService) {
    
    this.auth.getSchools().subscribe(e=>{
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
  event.target.src = './assets/trans.svg'
 //Do other stuff with the event.target
 }
 

}
