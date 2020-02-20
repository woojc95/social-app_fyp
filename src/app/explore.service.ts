import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Idea {
    id?: string,
    posts: string[],
    profilePic: string,
    username: string,
    jobTitle: string,
    company: string,
    name: string
  }

@Injectable({
    providedIn: 'root'
})

export class IdeaService {
    private ideas: Observable<Idea[]>;
    private ideaCollection: AngularFirestoreCollection<Idea>;

    constructor(private afs: AngularFirestore) {
        this.ideaCollection = this.afs.collection<Idea>('users');
        this.ideas = this.ideaCollection.snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return {id, ...data };
            });
          })
        );
    }

    getIdeas(): Observable<Idea[]> {
        return this.ideas;
      }
    
      getIdea(id: string): Observable<Idea> {
        return this.ideaCollection.doc<Idea>(id).valueChanges().pipe(
          take(1),
          map(idea => {
            idea.id = id;
            return idea;
          })
        );
      }

}
