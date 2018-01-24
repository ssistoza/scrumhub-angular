import { Component, OnInit } from '@angular/core';
import { ScrumUser } from '../../models/scrumUser.model';
import { ScrumUserAccountService } from '../../services/scrum-user-account.service';
import { Board } from '../../models/board.model';
import { AddBoardService } from '../../services/add-board.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public scrumUser: ScrumUser;
  public sboard: Board;

  constructor(private accountService: ScrumUserAccountService,
              private addBoardService: AddBoardService) { }

  add(): void {
    console.log(this.scrumUser);
    this.sboard = new Board(null, 'I Work!', null);

    this.addBoardService.addBoard(this.sboard)
      .subscribe(board => this.sboard = board);
  }

  getUserInfo() {
    this.accountService.getScrumUserAccount(1).subscribe(
      service => this.scrumUser = service
    );

  }
  ngOnInit() {
    this.getUserInfo();
  }

}
