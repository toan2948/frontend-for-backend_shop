import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestBehaviorSubjectService {

  public productIdSubject = new BehaviorSubject<number>(0);

  sendProductId(data: number | undefined){
    if (data != null) {
      this.productIdSubject.next(data);
    }
  }
  constructor() { }
}
