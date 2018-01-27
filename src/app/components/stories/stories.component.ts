import { Component, OnInit, Input  } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StoryComponent } from '../story/story.component';
import { Swimlane } from '../../models/swimlane.model';
import { SwimlanesComponent } from '../swimlanes/swimlanes.component';
import { ScrumUserAccountService } from '../../services/scrum-user-account.service';
import { Story } from '../../models/story.model';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  @Input() lane: Story;
  @Input() userid: number;
  @Input() laneId: number;
  @Input() swimlanes: Swimlane;
  @Input() laneIndex: number;
  @Input() swimlaneStoriesLength: number[];
  @Input() storiesLength: number;
  @Input() swimlaneIds: number;

  constructor(private modalService: NgbModal, private parent: SwimlanesComponent, private accountService: ScrumUserAccountService) { }

  open(event: Event, story) {
    event.stopPropagation();
    const modalRef = this.modalService.open(StoryComponent);
    modalRef.componentInstance.story = story;
    modalRef.componentInstance.stories = this.lane;
    modalRef.componentInstance.laneIndex = this.laneIndex;
    modalRef.componentInstance.swimlaneIds = this.swimlaneIds;
    modalRef.componentInstance.storiesLength = this.storiesLength;
    modalRef.componentInstance.swimlaneStoriesLength = this.swimlaneStoriesLength;
    modalRef.result.then(() => setTimeout(() => { this.parent.getUserInfo(1); }, 600));
  }

  shiftStoryUp(event: Event, order: number) {
    event.stopPropagation();

    let s = this.lane[order - 1].storyOrder = order - 1;
    this.accountService.reorderStory(this.lane[order - 1]).subscribe(
      reorderService => this.lane[order - 1] = reorderService
    );
    s = this.lane[order - 2].storyOrder = order;
    this.accountService.reorderStory(this.lane[order - 2]).subscribe(
      reorderService => this.lane[order - 2] = reorderService,
      error => console.log('Error: ', error),
      () => this.parent.getUserInfo(1)
    );
  }

  shiftStoryDown(event: Event, order: number) {
    event.stopPropagation();
    let s = this.lane[order - 1].storyOrder = order + 1;
    this.accountService.reorderStory(this.lane[order - 1]).subscribe(
      reorderService => this.lane[order - 1] = reorderService
    );
    s = this.lane[order].storyOrder = order;
    this.accountService.reorderStory(this.lane[order]).subscribe(
      reorderService => this.lane[order] = reorderService,
      error => console.log('Error: ', error),
      () => this.parent.getUserInfo(1)
    );
  }

  ngOnInit() {
  }

}
