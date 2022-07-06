import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUpload } from 'src/app/models/file-upload';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RecreationFileUploadService } from 'src/app/services/recreation-file-upload.service';
import { SchoolFileUploadService } from 'src/app/services/school-file-upload.service';

@Component({
  selector: 'app-recreation-edit',
  templateUrl: './recreation-edit.component.html',
  styleUrls: ['./recreation-edit.component.css']
})
export class RecreationEditComponent implements OnInit {

  member_id:any;
  member!: any;
  form!: FormGroup;
  submitted = false; 
  fileUploads?: any[];
  images?: Array<any> = [];
  bool!: boolean;

  constructor(private uploadService: RecreationFileUploadService,private formBuilder: FormBuilder,private _router: Router,private route: ActivatedRoute,public auth:AuthService,private notifyService : NotificationService) {
    
    this.form = new FormGroup({  
      quote: new FormControl('', Validators.required),
      location: new FormControl('', [Validators.required, Validators.minLength(3)]),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      images: new FormControl(''),  
    });
    this.uploadService.getFiles().subscribe((fileUploads: any[] | undefined) => { 
      this.fileUploads = fileUploads;
    });
   }

  ngOnInit() {
    this.route.params.subscribe(params => {  

      this.member_id = params['id'];
      
      this.auth.getRecreation(params['id']).subscribe(e=>{

        this.member = e;
        
        this.form.markAllAsTouched();
        this.images = this.member.images;

        this.form.patchValue({ 
          quote: this.member.quote,
          location: this.member.location,
          title: this.member.title,
          description: this.member.description,
          images: this.images, 

        });
        
      })
    });
  }

  isContained(fileUpload: any): boolean | undefined{ 
    if(this.imageExists(fileUpload.id)){
      return true  
      
    }else{  
      return false
    }   
  }


  include(fileUpload: any){
    if(this.imageExists(fileUpload.id)){ 
      const index = this.member.images!.findIndex((status: { id: any; }) => fileUpload.id === status.id);
      if (index !== -1) {
        this.member.images?.splice(index, 1);
      }       
      
    }else if (!this.imageExists(fileUpload.id)){ 
      this.images?.push(fileUpload) 
    } 
    
  }

      
  imageExists(id: any) { 
    return this.member.images?.some(function(el: { id: any; }) {
      return el.id === id;
    }); 
  }

  get f(){
    return this.form.controls;
  }
  
  submit(){
    this.form.patchValue({
      edited: this.auth.ts ,
      images:this.images
    });
    this.auth.updateRecreation(this.member_id,this.form.value) 
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    const index = this.member.images!.findIndex((status: { id: any; }) => fileUpload.id === status.id);
      if (index !== -1) {
        this.member.images?.splice(index, 1);
      }  
    this.uploadService.deleteFile(fileUpload);
  }
}
