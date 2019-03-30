import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  error: string;

  constructor(public data: DataService, public router: Router) { }

  ngOnInit() {
  }

  checkout() {
    this.data.checkout().subscribe(
      data => {
        if (data['success']) {
          this.router.navigate(['/confirmation']);
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
