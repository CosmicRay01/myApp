import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  pastry$: Object;
  amt = 0;
  success: boolean;
  error: String;
  public imagesUrl;

  constructor(private route: ActivatedRoute, private data: DataService, private router: Router) {
    this.route.params.subscribe( params => this.pastry$ = params.id );
 }

  ngOnInit() {
    this.imagesUrl = [
      '/assets/img/almond.jpeg',
      '/assets/img/apple.jpeg',
      '/assets/img/choc.jpeg',
      ],
    this.data.getPastry(this.pastry$).subscribe(
      data => this.pastry$ = data
    );
  }

  addCart(item, qty) {
    this.data.addCart(item, qty).subscribe(
      data => {
        this.success = data['success'];
        if (this.success) {
          this.router.navigate(['/checkout']);
        } else {
          this.newError(data['error']);
        }
      },
      error => {
        this.success = false;
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
