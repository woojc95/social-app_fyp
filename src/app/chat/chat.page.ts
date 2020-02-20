import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  
  text: string;
  chatRef: any;
  uid: string;
  fuid: string;
  newMessage: number = 0;

  constructor(
    public af:AngularFireAuth,
    public fs: AngularFirestore,
    public user: UserService,
    public route: ActivatedRoute
  ) {
    this.uid = this.user.getUID();
    this.fuid = this.route.snapshot.paramMap.get('id');
    this.chatRef = this.fs.collection('chats').doc(this.fuid).collection(this.fuid, ref=>ref.orderBy('Timestamp')).valueChanges();
   }

  ngOnInit() {
  }

  send() {
    if (this.text != '') {
      this.fs.collection('chats').doc(this.fuid).collection(this.fuid).add({
        // Name: this.af.auth.currentUser.displayName,
        Name: this.user.getUsername(),
        Message: this.text,
        UserID: this.af.auth.currentUser.uid,
        fUserID: this.fuid,
        Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.text = '';
    }
  }
}
