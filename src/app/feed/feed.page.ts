import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FeedService, Feed } from '../feed.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  uid: string

  private feeds: Observable<Feed[]>;
  
  constructor(
    private afs: AngularFirestore,
    private user: UserService,
    private feedService: FeedService,
    private router: Router) {
      this.uid = this.user.getUID();
  }

  ngOnInit() {
    this.feeds = this.feedService.getFeeds();
  }


  goToPost(postID: string) {
		this.router.navigate(['/tabs/post/' + postID.split('/')[0]]);
  }
  
  goToChat() {
    this.router.navigate(['/tabs/chat/' + this.uid]);
  }

}
