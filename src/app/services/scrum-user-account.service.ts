import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumUser } from '../models/scrumUser.model';
import { Board } from '../models/board.model';
import { Swimlane } from '../models/swimlane.model';
import { Story } from '../models/story.model';

const httpOptions = { // headers for the POST
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ScrumUserAccountService {
  url = environment.user.get;
  newBoardUrl = environment.user.create();

  constructor(private httpPost: HttpClient, private httpGet: Http) { } // User HTTP for retreiving JSON

  getScrumUserAccount(id: number): Observable<ScrumUser> {
    return this.httpGet
        .get(this.url + id)
        // must import Response datatype
        .map( (response: Response) => {
          console.log(response);
          return <ScrumUser> response.json();
        });
  }

    /** POST: add a new board to the DB */
    addBoard (board: Board): Observable<Board> {
      console.log('Hello');
      return this.httpPost.post<Board>(this.newBoardUrl, JSON.stringify(board), httpOptions);
    }

    /** POST: add a new swimlane to the DB */
    addSwimlane (swimlane: Swimlane): Observable<Swimlane> {
      return this.httpPost.post<Swimlane>(this.newSwimlaneUrl, JSON.stringify(swimlane), httpOptions);
    }

    /** POST: update a swimlane name */
    updateSwimlane (swimlane: Swimlane): Observable<Swimlane> {
      return this.httpPost.post<Swimlane>(this.updateSwimlaneUrl, JSON.stringify(swimlane), httpOptions);
    }

    /** POST: update a swimlane's order */
    reorderSwimlane (swimlane: Swimlane): Observable<Swimlane> {
      return this.httpPost.post<Swimlane>(this.reoderSwimlaneUrl, JSON.stringify(swimlane), httpOptions);
    }

    /** POST: insert a story card */
    addStory (story: Story): Observable<Story> {
      return this.httpPost.post<Story>(this.addStoryUrl, JSON.stringify(story), httpOptions);
    }

    /** POST: update a story card */
    updateStory (story: Story): Observable<Story> {
      return this.httpPost.post<Story>(this.updateStoryUrl, JSON.stringify(story), httpOptions);
    }

    /** POST: reorder a story card */
    reorderStory (story: Story): Observable<Story> {
      return this.httpPost.post<Story>(this.reorderStoryUrl, JSON.stringify(story), httpOptions);
    }

    /** POST: move a story card */
    moveStory (story: Story): Observable<Story> {
      return this.httpPost.post<Story>(this.moveStoryUrl, JSON.stringify(story), httpOptions);
    }

}
