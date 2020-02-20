
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  	postID: string
	post
	postReference: AngularFirestoreDocument
	sub

	heartType: string = "heart-empty"
	numLikes: number;
	likes;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private user: UserService
    ) {
     }

  ngOnInit() {
    this.postID = this.route.snapshot.paramMap.get('id');
    this.postReference = this.afs.doc(`post/${this.postID}`)
    this.sub = this.postReference.valueChanges().subscribe(val => {
			this.post = val
			this.heartType = val.likes.includes(this.user.getUID()) ? 'heart' : 'heart-empty'
			this.likes = val.likes
			this.numLikes = val.likes.length
		})
	}

  ngOnDestroy() {
		this.sub.unsubscribe()
	}

	toggleHeart() {
		if(this.heartType == 'heart-empty') {
			this.postReference.update({
				likes: firestore.FieldValue.arrayUnion(this.user.getUID())
			})
			this.numLikes = this.numLikes + 1;
		} else {
			this.postReference.update({
				likes: firestore.FieldValue.arrayRemove(this.user.getUID()) 
			})
			this.numLikes = this.numLikes - 1;
		}
	}

}
