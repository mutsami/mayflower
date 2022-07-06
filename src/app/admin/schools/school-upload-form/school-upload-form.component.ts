import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/models/file-upload'; 
import { SchoolFileUploadService } from 'src/app/services/school-file-upload.service';

@Component({
  selector: 'app-school-upload-form',
  templateUrl: './school-upload-form.component.html',
  styleUrls: ['./school-upload-form.component.css']
})
export class SchoolUploadFormComponent implements OnInit {

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  constructor(private uploadService: SchoolFileUploadService) { }
  ngOnInit(): void {
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {

        this.currentFileUpload = new FileUpload(file);
        console.log("Filename: " + file.name); 
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

}
