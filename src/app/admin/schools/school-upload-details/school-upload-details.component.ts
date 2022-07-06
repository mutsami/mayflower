import { Component, Input, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/models/file-upload'; 
import { SchoolFileUploadService } from 'src/app/services/school-file-upload.service';

@Component({
  selector: 'app-school-upload-details',
  templateUrl: './school-upload-details.component.html',
  styleUrls: ['./school-upload-details.component.css']
})
export class SchoolUploadDetailsComponent implements OnInit {

  @Input() fileUpload!: FileUpload;
  constructor(private uploadService: SchoolFileUploadService) { }
  ngOnInit(): void {
  }
  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }
}
