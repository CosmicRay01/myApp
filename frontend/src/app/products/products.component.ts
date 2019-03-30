import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

import {Observable } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0.0, transform: 'translateY(-20px)' }),
            stagger(
              '80ms',
              animate(
                '1000ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})

export class ProductsComponent implements OnInit {


  pastries$: Object;
  name: String;
  error: String;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.getPastries().subscribe(
      data => this.pastries$ = data
    );
  }

  addCart(item, qty) {
    this.data.addCart(item, qty).subscribe(
      data => {
        if (data['success']) {
          this.router.navigate(['/checkout']);
        } else {
          this.newError(data['error']);
        }
      },
      error => {
        this.newError(error['message']);
      }
    );
  }

  onSubmit(f: NgForm) {
    this.addCart(this.name, f.value.amount);
  }

  saveId(id) {
    this.name = id;
  }

  newError(toShow: string) {
    this.error = toShow;
    setTimeout(() => {
      this.error = undefined;
    }, 5000);
  }
}
