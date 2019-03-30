import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  cancelled = false;
  error: string;

  constructor(public data: DataService) { }

  ngOnInit() {
  }

  cancelOrder() {
    this.data.cancelOrder().subscribe(
      data => {
        if (data['success']) {
          this.cancelled = true;
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
