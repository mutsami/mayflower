import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Career } from 'src/app/models/career';
import { Member } from 'src/app/models/member';
import { AuthService } from 'src/app/services/auth.service';  
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  fileUploads?: any[];
  form!: FormGroup;
  careers!:any[];
  constructor(private _router: Router,private formBuilder: FormBuilder,public auth:AuthService,private notifyService : NotificationService) {
     
    this.auth.getCareers().subscribe(e=>{
      this.careers = e;
    })
    this.form = new FormGroup({
      nature: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      uploaded: new FormControl(''),
      location: new FormControl('', [Validators.required, Validators.minLength(3)]),
      department: new FormControl('', Validators.required)
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
    this.auth.createCareer(this.form.value).then(()=>{

      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
      this._router.navigate(['admin/careers']).then(()=>{ 
        this.notifyService.showSuccess("New opening has been created succefully.", "Saved!!")
    })
    })
  }

  getDept(dept:any) :string{ 
     dept;
    if (dept == '1') {
      dept = 'Sales'
    } else if (dept == '2'){
      dept =  'IT'
    } else if (dept == '3'){
      dept =  'Marketing'
    } else if (dept == '4'){
      dept =  'Finance'
    } else if (dept == '5'){
      dept =  'Human resource'
    } else if (dept == '6'){
      dept =  'Engineering'
    } else if (dept == '7'){
      dept =  'Other'
    }
    return dept;
  }

}
