import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { IdeaService, Idea } from '../explore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private idea: Observable<Idea>;

  userPosts
  mainuser: AngularFirestoreDocument;
  sub;
  username: string;
  posts
  profilePic: string;
  cname: string;
  company: string;
  email: string;
  phone: string;
  title: string;

  vCardInfo: string;

  constructor(
    private afs: AngularFirestore,
    private user: UserService,
    private router: Router,
    private ideaService: IdeaService
    ) { 
      this.mainuser = afs.doc(`users/${user.getUID()}`);
      this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.posts = event.posts;
        this.username = event.username;
        this.cname = event.name;
        this.profilePic = event.profilePic;
        this.company = event.company;
        this.email = event.email;
        this.phone = event.phone;
        this.title = event.jobTitle;
        this.vCardInfo = `BEGIN:VCARD
VERSION:3.0
N:${this.cname}
ORG:${this.company}
EMAIL:${this.email}
TITLE:${this.title}
TEL;TYPE=voice,main,oref:${this.phone}
END:VCARD
`

// N:${surname};${name}
// FN:${surname} ${name}
// URL:${url}
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(){
  }

  goTo(postID: string) {
		this.router.navigate(['/tabs/post/' + postID.split('/')[0]])
	}

}
