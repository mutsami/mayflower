import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; 
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, map, switchMap, take } from 'rxjs/operators'; 

import firebase from 'firebase/compat/app'; 
import { Router } from '@angular/router';
import { User } from '../models/user'; 
import { NotificationService } from './notification.service'; 
import { Partnership } from '../models/Partnership';
import { Blog } from '../models/blog';
import { Career } from '../models/career';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$: Observable<any>;
  ts:any;
  blogCollection!: AngularFirestoreCollection<Blog>;
  blogs!: Observable<Blog[]>;
  blogDoc?: AngularFirestoreDocument<Blog>;

  memberCollection!: AngularFirestoreCollection<Member>;
  members!: Observable<Member[]>;
  memberDoc?: AngularFirestoreDocument<Member>;

  careerCollection!: AngularFirestoreCollection<Career>;
  careers!: Observable<Career[]>;
  careerDoc?: AngularFirestoreDocument<Career>;

  status!:boolean;
  
  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore, private router: Router,private notifyService : NotificationService) { 
      this.ts = firebase.firestore.Timestamp.now()
      // Get the auth state, then fetch the Firestore user document or return null
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) { 
            this.afs.doc<User>(`users/${user.uid}`).snapshotChanges().subscribe(e=>{
              if(e.payload.data()?.verified){
                console.log('auth true')
                this.status = true;
              }else{
                console.log('auth false')
                this.status = false;
              }
            })
            
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            
            this.status = false;
            console.log('user logged out')
            return of(null);
          }
      }))
    }

    // Sign in with Google
    async googleSignin() {
      return this.AuthLogin(new  firebase.auth.GoogleAuthProvider());
    }  
    // Auth logic to run auth providers
    AuthLogin(provider: firebase.auth.GoogleAuthProvider) {
      return this.afAuth.signInWithPopup(provider)
      .then((result) => { 
        return this.updateUserData(result.user);
      }).catch((error) => {
          console.log(error)
      })
    }

    updateUserData(user: any) { 
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

      const data = { 
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName, 
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber 
      } 

      return userRef.set(data, { merge: true })

    }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/admin']);
  }

  getBlog(id: any){
    return this.afs.doc(`blogs/${id}`).valueChanges()
  }

  getBlogs() {
    this.blogCollection = this.afs.collection('blogs', ref => ref.orderBy('uploaded','desc'));
    return this.blogCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Blog;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }
  getFirstBlogs() {
    this.blogCollection = this.afs.collection('blogs', ref => ref.orderBy('uploaded','asc').limit(2));
    return this.blogCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Blog;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
        })
    );
  }

  updateBlog(id: string,blog: any) {
    this.afs.doc('blogs/' + id).update(blog).then(()=>{
      this.router.navigate(['admin/blog']).then(()=>{ 
          this.notifyService.showSuccess("The blog has been edited succefully.", "Saved!!")
      })

    })
  }

  createBlog(blog: Blog){
    return this.afs.collection('blogs').add(blog)
  }

deleteBlog(blog_id: string){
  this.afs.doc('blogs/' + blog_id).delete();
}

createMember(member: Member){
  return this.afs.collection('members').add(member)
}

updateMember(id: string,member: any) {
  this.afs.doc('members/' + id).update(member).then(()=>{
    this.router.navigate(['admin/team']).then(()=>{ 
        this.notifyService.showSuccess("The member has been edited succefully.", "Saved!!")
    })

  })
}

getMember(id: any){
  return this.afs.doc(`members/${id}`).valueChanges()
}

getMembers() {
  this.memberCollection = this.afs.collection('members', ref => ref.orderBy('uploaded','desc'));
  return this.memberCollection
    .snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Member;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
}

deleteMember(member_id: string){ 
  this.afs.doc('members/' + member_id).delete().then(()=>{
    this.router.navigate(['admin/team']).then(()=>{ 
        this.notifyService.showInfo("The member has been deleted succefully.", "Saved!!")
    })

  })
}

getManagementMembers() {
  this.memberCollection = this.afs.collection('members', ref => ref.orderBy('uploaded','asc').where('tier','==','2'));
  return this.memberCollection
    .snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Member;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
}

getDirectorsMembers() {
  this.memberCollection = this.afs.collection('members', ref => ref.orderBy('uploaded','asc').where('tier','==','1'));
  return this.memberCollection
    .snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Member;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
}

createMailList(mail: any){
  return this.afs.collection('mailing_list').add(mail)
}

getMailList() {
  this.blogCollection = this.afs.collection('mailing_list', ref => ref.orderBy('uploaded','desc'));
  return this.blogCollection
    .snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Blog;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
}
deleteMailList(mail_id: string){ 
  this.afs.doc('mailing_list/' + mail_id).delete().then(()=>{
    this.router.navigate(['/admin']).then(()=>{ 
        this.notifyService.showInfo("The mail address has been deleted succefully.", "Saved!!")
    })

  })
}

getUsers() {
  this.blogCollection = this.afs.collection('users', ref => ref.orderBy('email','desc'));
  return this.blogCollection
    .snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
}


checkStatus():any{
  let status ;
  return this.afAuth.authState.subscribe(e=>{

    return this.getUserProfileData(e?.uid).subscribe(r=>{
       
    if(e && r.verified){
      console.log('tr')
      return true
    }else{
      console.log('fls')
      return false
    } 
    }) 
  })
}
getUserProfileData(id: any){
  return this.afs.doc(`users/${id}`).snapshotChanges().pipe(take(1)).pipe(
    map(a => {
      const data = a.payload.data() as any;
      const id = a.payload.id;
      return { id, ...data };
  })
);
  }

updateUser(id: string,verified: any) {
  this.afs.doc('users/' + id).update(
    {verified}
  )
}
deleteUser(user_id: string){ 
  this.afs.doc('users/' + user_id).delete().then(()=>{
    this.router.navigate(['/admin']).then(()=>{ 
        this.notifyService.showInfo("The user has been deleted succefully.", "Saved!!")
    })

  })
}

createCareer(career: Career){
  return this.afs.collection('careers').add(career)
}

updateCareer(id: string,career: any) {
  this.afs.doc('careers/' + id).update(career).then(()=>{
    this.router.navigate(['admin/careers']).then(()=>{ 
        this.notifyService.showSuccess("The career has been edited succefully.", "Saved!!")
    })

  })
}

getCareer(id: any){
  return this.afs.doc(`careers/${id}`).valueChanges()
}

getCareers() {
  this.careerCollection = this.afs.collection('careers', ref => ref.orderBy('uploaded','desc'));
  return this.careerCollection
    .snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Member;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
}

deleteCareer(career_id: string){ 
  this.afs.doc('careers/' + career_id).delete().then(()=>{
    this.router.navigate(['admin/careers']).then(()=>{ 
        this.notifyService.showInfo("The opening has been deleted succefully.", "Saved!!")
    })

  })
}

createPartnership(partnership: Partnership){
  return this.afs.collection('partnerships').add(partnership)
}

updatePartnership(id: string,partnership: any) {
  this.afs.doc('partnerships/' + id).update(partnership).then(()=>{
    this.router.navigate(['admin/partnerships']).then(()=>{ 
        this.notifyService.showSuccess("The partnership request has been edited succefully.", "Saved!!")
    })

  })
}

getPartnership(id: any){
  return this.afs.doc(`partnerships/${id}`).valueChanges()
}

getPartnerships() {
  this.careerCollection = this.afs.collection('partnerships', ref => ref.orderBy('uploaded','desc'));
  return this.careerCollection
    .snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
}

deletePartnership(partnership_id: string){ 
  this.afs.doc('partnerships/' + partnership_id).delete().then(()=>{
    this.router.navigate(['admin/partnerships']).then(()=>{ 
        this.notifyService.showInfo("The partnership request has been deleted succefully.", "Saved!!")
    })

  })
}

createMessages(message: any){
  return this.afs.collection('messages').add(message)
}


getMessages() {
  this.careerCollection = this.afs.collection('messages', ref => ref.orderBy('uploaded','desc'));
  return this.careerCollection
    .snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
}

deleteMessage(message_id: string){ 
  this.afs.doc('messages/' + message_id).delete().then(()=>{
    this.router.navigate(['admin/messages']).then(()=>{ 
        this.notifyService.showInfo("The message has been deleted succefully.", "Saved!!")
    })

  })
}


createProgram(program: any){
  return this.afs.collection('programs').add(program)
}

updateProgram(id: string,programs: any) {
  this.afs.doc('programs/' + id).update(programs).then(()=>{
    this.router.navigate(['admin/programs']).then(()=>{ 
        this.notifyService.showSuccess("The program has been edited succefully.", "Saved!!")
    })

  })
}

getProgram(id: any){
  return this.afs.doc(`programs/${id}`).valueChanges()
}

getPrograms() {
  this.memberCollection = this.afs.collection('programs', ref => ref.orderBy('uploaded','desc'));
  return this.memberCollection
    .snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Member;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
}

deleteProgram(member_id: string){ 
  this.afs.doc('programs/' + member_id).delete().then(()=>{
    this.router.navigate(['admin/programs']).then(()=>{ 
        this.notifyService.showInfo("The program has been deleted succefully.", "Saved!!")
    })

  })
}


createSchool(program: any){
  return this.afs.collection('schools').add(program)
}

updateSchool(id: string,programs: any) {
  this.afs.doc('schools/' + id).update(programs).then(()=>{
    this.router.navigate(['admin/schools']).then(()=>{ 
        this.notifyService.showSuccess("The school has been edited succefully.", "Saved!!")
    })

  })
}

getSchool(id: any){
  return this.afs.doc(`schools/${id}`).valueChanges()
}

getSchools() {
  this.memberCollection = this.afs.collection('schools', ref => ref.orderBy('uploaded','desc'));
  return this.memberCollection
    .snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
}

deleteSchool(member_id: string){ 
  this.afs.doc('schools/' + member_id).delete().then(()=>{
    this.router.navigate(['admin/schools']).then(()=>{ 
        this.notifyService.showInfo("The school has been deleted succefully.", "Saved!!")
    })

  })
}

createRecreation(program: any){
  return this.afs.collection('recreations').add(program)
}

updateRecreation(id: string,programs: any) {
  this.afs.doc('recreations/' + id).update(programs).then(()=>{
    this.router.navigate(['admin/recreation']).then(()=>{ 
        this.notifyService.showSuccess("The recreation activity has been edited succefully.", "Saved!!")
    })

  })
}

getRecreation(id: any){
  return this.afs.doc(`recreations/${id}`).valueChanges()
}

getRecreations() {
  
  this.memberCollection = this.afs.collection('recreations', ref => ref.orderBy('uploaded','desc'));
  return this.memberCollection
    .snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id; 
          return { id, ...data };
      });
      })
  );
}

deleteRecreation(member_id: string){ 
  this.afs.doc('recreations/' + member_id).delete().then(()=>{
    this.router.navigate(['admin/recreation']).then(()=>{ 
        this.notifyService.showInfo("The recreation activity has been deleted succefully.", "Saved!!")
    })

  })
}

createVisits(program: any){
  return this.afs.collection('visits').add(program)
}

updateVisit(id: string,programs: any) {
  this.afs.doc('visits/' + id).update(programs).then(()=>{
    this.router.navigate(['admin/visits']).then(()=>{ 
        this.notifyService.showSuccess("The visit has been edited succefully.", "Saved!!")
    })

  })
}

getVisit(id: any){
  return this.afs.doc(`visits/${id}`).valueChanges()
}

getVisits() {
  this.memberCollection = this.afs.collection('visits', ref => ref.orderBy('uploaded','desc'));
  return this.memberCollection
    .snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      })
  );
}

deleteVisit(member_id: string){ 
  this.afs.doc('visits/' + member_id).delete().then(()=>{
    this.router.navigate(['admin/visits']).then(()=>{ 
        this.notifyService.showInfo("The visit has been deleted succefully.", "Saved!!")
    })

  })
}





 
}