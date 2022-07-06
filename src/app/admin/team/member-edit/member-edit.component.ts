import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/models/member';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member_id:any;
  member!: any;
  form!: FormGroup;
  submitted = false; 
  fileUploads?: any[];

  constructor(private uploadService: FileUploadService,private formBuilder: FormBuilder,private _router: Router,private route: ActivatedRoute,public auth:AuthService,private notifyService : NotificationService) {
    this.form = new FormGroup({
      tier: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      title: new FormControl('', Validators.required) ,
      edited: new FormControl(''),
      photoURL: new FormControl('', Validators.required)
    });
    this.uploadService.getFiles().subscribe((fileUploads: any[] | undefined) => { 
      this.fileUploads = fileUploads;
    });
    
    this.route.params.subscribe(params => {  

      this.member_id = params['id'];
      
      this.auth.getMember(params['id']).subscribe(e=>{

        this.member = e;

        
        this.form.markAllAsTouched();

        this.form.patchValue({
         photoURL: this.member.photoURL,
         name: this.member.name,
         tier: this.member.tier,
         title: this.member.title

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
    this.auth.updateMember(this.member_id,this.form.value) 
  }

}
