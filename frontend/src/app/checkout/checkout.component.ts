import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})

export class CheckoutComponent implements OnInit {
  cart: object;
  cart$: object;
  cartEmpty: boolean;
  cartTotal: number;

  name: string;

  error: string;

  constructor(public data: DataService, public router: Router) { }

  ngOnInit() {
    this.data.getCart().subscribe(
    data => {
      this.cartEmpty = true;
      this.cartTotal = 0;
      if (data['success']) {
        this.cart = new Object();
        for (let key in data['data']) {
          this.getItem(key).then(product => {
              if (product['success']) {
                this.cart[key] = product['data'];
                (this.cart[key])['cartQty'] = (data['data'][key]);
                this.cartTotal += (this.cart[key])['cartQty'] * (this.cart[key])['price'];

                this.cartEmpty = false;
              } else {
                this.newError(product['error']);
              }
            },
            error => {
              this.newError(error['message']);
            });
        }
      } else {
        this.newError(data['error']);
      }
    },
      error => {
        this.newError(error['message']);
      }
    );
  }

  getItem(id: string): Promise<object> {
    return this.data.getPastry(id).toPromise();
  }

  changeQty(id: string, qty: string) {
    this.data.changeQty(id, qty)
      .subscribe(
        data => {
          if (data['success']) {
            this.ngOnInit();
          } else {
            this.newError(data['error']);
          }
        },
        error => {
          this.newError(error['message']);
        }
      );
  }

  removeItem(id: string) {
    this.data.removeItem(id)
      .subscribe(
        data => {
          if (data['success']) {
            this.ngOnInit();
          } else {
            this.newError(data['error']);
          }
        },
        error => {
          this.newError(error['message']);
        }
      );
  }

  clearCart() {
    this.data.clearCart().subscribe(
      data => {
        if (data['success']) {
          this.ngOnInit();
        } else {
          this.newError(data['error']);
        }
      },
      error => {
        this.newError(error['message']);
      }
    );
  }

  saveId(id) {
    this.name = id;
  }

  onSubmit(f: NgForm) {
    this.changeQty(this.name, f.value.amount);
  }

  newError(toShow: string) {
    this.error = toShow;
    setTimeout(() => {
      this.error = undefined;
    }, 5000);
  }
}
