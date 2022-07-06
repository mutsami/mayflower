import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
import { NotificationService } from 'src/app/services/notification.service';
import { ProgramFileUploadService } from 'src/app/services/program-file-upload.service';

@Component({
  selector: 'app-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.css']
})
export class ProgramEditComponent implements OnInit {

  member_id:any;
  member!: any;
  form!: FormGroup;
  submitted = false; 
  fileUploads?: any[];

  constructor(private uploadService: ProgramFileUploadService,private formBuilder: FormBuilder,private _router: Router,private route: ActivatedRoute,public auth:AuthService,private notifyService : NotificationService) {
    
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
    });
    this.uploadService.getFiles().subscribe((fileUploads: any[] | undefined) => { 
      this.fileUploads = fileUploads;
    });
    
    this.route.params.subscribe(params => {  

      this.member_id = params['id'];
      
      this.auth.getProgram(params['id']).subscribe(e=>{

        this.member = e;

        
        this.form.markAllAsTouched();

        this.form.patchValue({
        im1:  this.member.im1,
        im2: this.member.im2,
        im3: this.member.im3,
        im4: this.member.im4,
        im5: this.member.im5,
        im6: this.member.im6,
        im7: this.member.im7,
        im8: this.member.im8,
        im9: this.member.im9, 
        quote: this.member.quote,
        location: this.member.location,
        title: this.member.title,
        description: this.member.description,

        });
        
      })
    });

   }

  ngOnInit() {
    
  }
      
  get f(){
    return this.form.controls;
  }
  
  submit(){
    this.form.patchValue({
      edited: this.auth.ts 
    });
    this.auth.updateProgram(this.member_id,this.form.value) 
  }
}
