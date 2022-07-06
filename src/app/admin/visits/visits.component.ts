import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/models/file-upload';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service'; 
import { VisitsFileUploadService } from 'src/app/services/visits-file-upload.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
  
  fileUploads?: any[]; 
  images?: Array<any> = [];
  form!: FormGroup;
  members!:any[];
  @Input() fileUpload!: FileUpload;


  
  constructor(private _router: Router,private formBuilder: FormBuilder,private uploadService: VisitsFileUploadService,public auth:AuthService,private notifyService : NotificationService) {
    this.uploadService.getFiles().subscribe((fileUploads: any[] | undefined) => { 
      this.fileUploads = fileUploads; 
    }); 
    this.auth.getVisits().subscribe(e=>{
      this.members = e;
    })
    this.form = new FormGroup({  
      quote: new FormControl('', Validators.required),
      location: new FormControl('', [Validators.required, Validators.minLength(3)]),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      images: new FormControl(''), 
      uploaded: new FormControl(''), 
    });
   }

  ngOnInit() {
  }

  
  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }

    
  get f(){
    return this.form.controls;
  }

  include(fileUpload: any){
    if(this.imageExists(fileUpload.id)){
      const index: any = this.images?.indexOf(fileUpload);
      if (index !== -1) {
          this.images?.splice(index, 1);
      }   
      
    }else if (!this.imageExists(fileUpload.id)){ 
      this.images?.push(fileUpload)
    } 
    
  }

  imageExists(id: any) {
    return this.images?.some(function(el) {
      return el.id === id;
    }); 
  }
  
  submit(){ 
    this.form.patchValue({
      uploaded: this.auth.ts,
      images:this.images
    });
    this.auth.createVisits(this.form.value).then(()=>{

      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
      this._router.navigate(['admin/visits']).then(()=>{ 
      this.notifyService.showSuccess("New visit has been created succefully.", "Saved!!")
    })
    })
  }

}
