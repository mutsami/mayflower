import { Component, OnInit } from '@angular/core'; 
import { SchoolFileUploadService } from 'src/app/services/school-file-upload.service';

@Component({
  selector: 'app-school-upload-list',
  templateUrl: './school-upload-list.component.html',
  styleUrls: ['./school-upload-list.component.css']
})
export class SchoolUploadListComponent implements OnInit {
  fileUploads?: any[];
  constructor(private uploadService: SchoolFileUploadService) { }
  ngOnInit(): void { 
    this.uploadService.getFiles().subscribe((fileUploads: any[] | undefined) => { 
      this.fileUploads = fileUploads;
    });
  }

}
