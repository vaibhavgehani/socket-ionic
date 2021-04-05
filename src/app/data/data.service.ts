import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userData = {
    name: null,
    email: null
  };
  constructor() { }
}
