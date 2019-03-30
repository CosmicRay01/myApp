import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  user: User = new User();
  login = false;
  error: string;

  constructor(public data: DataService, private router: Router) { }

  ngOnInit() {
    if (this.data.localUserExists()) {
      this.router.navigate(['products']);
    }
  }

  add(todo: string): void {
    this.data.userPost(this.user, todo)
      .subscribe(
        data => {
          if (data['success']) {
            this.data.saveLocalUser(this.user);
            this.user.username = '';
            this.user.password = '';
            this.router.navigate(['products']);
          } else {
            this.newError(data['error']);
          }
        },
        error => {
          this.newError(error['message']);
        }
      );
  }

  newError(toShow: string) {
    this.error = toShow;
    setTimeout(() => {
      this.error = undefined;
    }, 5000);
  }
}
