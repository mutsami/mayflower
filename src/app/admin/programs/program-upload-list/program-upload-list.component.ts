import { Component, OnInit } from '@angular/core';
import { ProgramFileUploadService } from 'src/app/services/program-file-upload.service';

@Component({
  selector: 'app-program-upload-list',
  templateUrl: './program-upload-list.component.html',
  styleUrls: ['./program-upload-list.component.css']
})
export class ProgramUploadListComponent implements OnInit {
  fileUploads?: any[];
  constructor(private uploadService: ProgramFileUploadService) { }
  ngOnInit(): void { 
    this.uploadService.getFiles().subscribe((fileUploads: any[] | undefined) => { 
      this.fileUploads = fileUploads;
    });
  }

}
