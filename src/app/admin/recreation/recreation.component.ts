import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/models/file-upload';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RecreationFileUploadService } from 'src/app/services/recreation-file-upload.service'; 

@Component({
  selector: 'app-recreation',
  templateUrl: './recreation.component.html',
  styleUrls: ['./recreation.component.css']
})
export class RecreationComponent implements OnInit {
  
  fileUploads?: any[]; 
  images?: Array<any> = [];
  form!: FormGroup;
  members!:any[];
  @Input() fileUpload!: FileUpload;


  
  constructor(private _router: Router,private formBuilder: FormBuilder,private uploadService: RecreationFileUploadService,public auth:AuthService,private notifyService : NotificationService) {
    this.uploadService.getFiles().subscribe((fileUploads: any[] | undefined) => { 
      this.fileUploads = fileUploads; 
    }); 
    this.auth.getRecreations().subscribe(e=>{
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
    this.auth.createRecreation(this.form.value).then(()=>{

      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
      this._router.navigate(['admin/recreation']).then(()=>{ 
      this.notifyService.showSuccess("New activity has been created succefully.", "Saved!!")
    })
    })
  }

}
