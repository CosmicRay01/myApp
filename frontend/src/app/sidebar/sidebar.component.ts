import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  currentUrl: string;
  name: string;
  funds: string;

  constructor(private router: Router, public data: DataService) {
    // router.events.subscribe((_: NavigationEnd) => this.currentUrl = router.url);
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((_: NavigationEnd) => { this.currentUrl = _.url; });
  }

  ngOnInit() {
    // Redirects user to login page - don't remove!!
    if (!this.data.localUserExists()) {
      this.router.navigate(['/']);
    }
    this.data.getUserData().subscribe(
      data => {
        if (data['success']) {
          this.name = (data['data'])['username'];
          this.funds = (data['data'])['funds'];
        }
      },
      error => {
        console.log(error['message']);
      }
    );
  }


}
