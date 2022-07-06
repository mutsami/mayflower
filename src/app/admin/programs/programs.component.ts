import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member';
import { AuthService } from 'src/app/services/auth.service'; 
import { NotificationService } from 'src/app/services/notification.service';
import { ProgramFileUploadService } from 'src/app/services/program-file-upload.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  fileUploads?: any[];
  form!: FormGroup;
  members!:any[];
  constructor(private _router: Router,private formBuilder: FormBuilder,private uploadService: ProgramFileUploadService,public auth:AuthService,private notifyService : NotificationService) {
    this.uploadService.getFiles().subscribe((fileUploads: any[] | undefined) => { 
      this.fileUploads = fileUploads;
      console.log('dfgdsf',fileUploads)
    });
    this.auth.getPrograms().subscribe(e=>{
      this.members = e;
    })
    this.form = new FormGroup({
      im1: new FormControl('', Validators.required),
      im2: new FormControl('', Validators.required),
      im3: new FormControl('', Validators.required),
      im4: new FormControl('', Validators.required),
      im5: new FormControl('', Validators.required),
      im6: new FormControl('', Validators.required),
      im7: new FormControl('', Validators.required),
      im8: new FormControl('', Validators.required),
      im9: new FormControl('', Validators.required), 
      quote: new FormControl('', Validators.required),
      location: new FormControl('', [Validators.required, Validators.minLength(3)]),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      uploaded: new FormControl(''), 
    });
   }

  ngOnInit() {
  }

    
  get f(){
    return this.form.controls;
  }
  
  submit(){
    this.form.patchValue({
      uploaded: this.auth.ts
    });
    this.auth.createProgram(this.form.value).then(()=>{

      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
      this._router.navigate(['admin/programs']).then(()=>{ 
        this.notifyService.showSuccess("New program has been created succefully.", "Saved!!")
    })
    })
  }

}
