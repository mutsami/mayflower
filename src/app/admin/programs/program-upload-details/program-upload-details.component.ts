import { Component, Input, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/models/file-upload';
import { ProgramFileUploadService } from 'src/app/services/program-file-upload.service';

@Component({
  selector: 'app-program-upload-details',
  templateUrl: './program-upload-details.component.html',
  styleUrls: ['./program-upload-details.component.css']
})
export class ProgramUploadDetailsComponent implements OnInit {

  @Input() fileUpload!: FileUpload;
  constructor(private uploadService: ProgramFileUploadService) { }
  ngOnInit(): void {
  }
  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }

}
