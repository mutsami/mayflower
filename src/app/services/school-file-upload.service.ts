import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize, map } from 'rxjs';
import { FileUpload } from '../models/file-upload';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolFileUploadService { 
  


  uploadsCollection!: AngularFirestoreCollection<any>;
  uploads!: Observable<any[]>;
  uploadDoc?: AngularFirestoreDocument<any>;
  private basePath = '/school_uploads';
  constructor(private db: AngularFirestore, private storage: AngularFireStorage,private auth:AuthService) { }
  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }
  public saveFileData(fileUpload: FileUpload) { 
    const data = { 
      name: fileUpload.name, 
      url: fileUpload.url,
      type:fileUpload.file.type,
      uploaded: this.auth.ts
    };
    return this.db.collection('school_uploads').add(data).then(e=>{
      return e.id;
    });
  }
  getFiles(): any { 
    this.uploadsCollection = this.db.collection('school_uploads', ref => ref.orderBy('uploaded'));
    return this.uploadsCollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
  }
  deleteFile(fileUpload: FileUpload): void { 

    
    this.deleteFileDatabase(fileUpload.id)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }
  private deleteFileDatabase(key: string): Promise<void> { 
    return  this.db.doc('school_uploads/' + key).delete();
  }
  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
