import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/models/file-upload';
import { RecreationFileUploadService } from 'src/app/services/recreation-file-upload.service';
import { VisitsFileUploadService } from 'src/app/services/visits-file-upload.service';

@Component({
  selector: 'app-visits-upload-form',
  templateUrl: './visits-upload-form.component.html',
  styleUrls: ['./visits-upload-form.component.css']
})
export class VisitsUploadFormComponent implements OnInit {

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  constructor(private uploadService: VisitsFileUploadService) { }
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
