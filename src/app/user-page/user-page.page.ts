import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss'],
})
export class UserPagePage implements OnInit {

  userID: string;
  user: AngularFirestoreDocument;
  sub;
  posts;
  name;
  username;
  profilePic;
  company;
  phone;
  email;
  jobTitle;
  school;
  cuid;
  sameUser: boolean = false;
  
  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private currentUser: UserService) {
      this.userID = this.route.snapshot.paramMap.get('id');
      this.cuid = this.currentUser.getUID()
      this.user = afs.doc(`users/${this.userID}`);
      this.sub = this.user.valueChanges().subscribe(event => {
        this.posts = event.posts;
        this.username = event.username;
        this.name = event.name;
        this.profilePic = event.profilePic;
        this.jobTitle = event.jobTitle;
        this.email = event.email;
        this.phone = event.phone;
        this.company = event.company;
        this.school = event.school;
      });
      if (this.userID === this.cuid) {
        this.sameUser = true;
      }
    }

  ngOnInit() {
  }

  goToPost(postID: string) {
		this.router.navigate(['/tabs/post/' + postID.split('/')[0]])
  }
  
  goToChat(postID: string) {
    this.router.navigate(['/tabs/chat/' + postID.split('/')[0]]);
  }

}
