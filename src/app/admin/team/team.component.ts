import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  fileUploads?: any[];
  form!: FormGroup;
  members!:Member[];
  constructor(private _router: Router,private formBuilder: FormBuilder,private uploadService: FileUploadService,public auth:AuthService,private notifyService : NotificationService) {
    this.uploadService.getFiles().subscribe((fileUploads: any[] | undefined) => { 
      this.fileUploads = fileUploads;
    });
    this.auth.getMembers().subscribe(e=>{
      this.members = e;
    })
    this.form = new FormGroup({
      tier: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      title: new FormControl('', Validators.required),
      uploaded: new FormControl(''),
      photoURL: new FormControl('', Validators.required)
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
    this.auth.createMember(this.form.value).then(()=>{

      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
      this._router.navigate(['admin/team']).then(()=>{ 
        this.notifyService.showSuccess("New member has been created succefully.", "Saved!!")
    })
    })
  }


}
