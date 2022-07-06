import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})

export class UploadListComponent implements OnInit {
  fileUploads?: any[];
  constructor(private uploadService: FileUploadService) { }
  ngOnInit(): void { 
    this.uploadService.getFiles().subscribe((fileUploads: any[] | undefined) => { 
      this.fileUploads = fileUploads;
    });
  }
}