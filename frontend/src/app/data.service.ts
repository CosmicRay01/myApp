import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from './user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  getPastries() {
    return this.http.get('https://api-sddb.webb.pw/api/products/list');
  }

  getPastry(pastryId) {
    return this.http.get('https://api-sddb.webb.pw/api/products/show/' + pastryId);
  }

  addCart (item, qty) {
    return this.http.post('https://api-sddb.webb.pw/api/users/cart/add?item=' + item + '&qty=' + qty,
      this.getLocalUser(), this.httpOptions);
  }

  getCart() {
    return this.http.post('https://api-sddb.webb.pw/api/users/cart/get', this.getLocalUser(), this.httpOptions);
  }

  changeQty(item: string, qty: string) {
    return this.http.post('https://api-sddb.webb.pw/api/users/cart/change?item=' + item + '&qty=' + qty,
      this.getLocalUser(), this.httpOptions);
  }

  removeItem(item: string) {
    return this.http.post('https://api-sddb.webb.pw/api/users/cart/remove?item=' + item,
      this.getLocalUser(), this.httpOptions);
  }

  userPost(user: User, todo: string) {
    // new or authenticate
    return this.http.post('https://api-sddb.webb.pw/api/users/' + todo, user, this.httpOptions);
  }

  checkout() {
    return this.http.post('https://api-sddb.webb.pw/api/finalize/checkout', this.getLocalUser(), this.httpOptions);
  }

  cancelOrder() {
    return this.http.post('https://api-sddb.webb.pw/api/finalize/cancel', this.getLocalUser(), this.httpOptions);
  }

  clearCart() {
    return this.http.post('https://api-sddb.webb.pw/api/users/cart/clear', this.getLocalUser(), this.httpOptions);
  }

  getUserData() {
    return this.http.post('https://api-sddb.webb.pw/api/users/get', this.getLocalUser(), this.httpOptions);
  }

  getLocalUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  saveLocalUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearLocalUser() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  localUserExists(): boolean {
    return localStorage.hasOwnProperty('user');
  }
}
