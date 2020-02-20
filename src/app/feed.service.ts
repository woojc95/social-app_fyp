import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Feed {
    id?: string,
    author: string,
    desc: string,
    likes: string[]
  }

@Injectable({
    providedIn: 'root'
})

export class FeedService {
    private feeds: Observable<Feed[]>;
    private feedCollection: AngularFirestoreCollection<Feed>;

    constructor(private afs: AngularFirestore) {
        this.feedCollection = this.afs.collection<Feed>('post', ref=>ref.orderBy('Timestamp'));
        this.feeds = this.feedCollection.snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return {id, ...data };
            });
          })
        );
    }

    getFeeds(): Observable<Feed[]> {
        return this.feeds;
      }
    
      getFeed(id: string): Observable<Feed> {
        return this.feedCollection.doc<Feed>(id).valueChanges().pipe(
          take(1),
          map(feed => {
            feed.id = id;
            return feed;
          })
        );
      }

}
