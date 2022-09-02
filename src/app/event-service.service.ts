import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  private events$: Subject<any> = new Subject<any>();
  constructor() { }

  emit(event: string, data?: any) {
    if(!event) {
      throw Error('Cannot emit a null event');
    }
    data._event = event;
    this.events$.next(data);
  }

  listen(): Observable<any> {
    return this.events$.pipe();
  }
}
