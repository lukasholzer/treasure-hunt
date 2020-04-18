import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const initialState = {
  id: null,
};

@Injectable({
  providedIn: 'root',
})
export class Facade {
  state = new BehaviorSubject(initialState);
}
