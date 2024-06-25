import { Injectable,EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data$: Observable<any> = this.dataSubject.asObservable();

  $dataAsesor= new EventEmitter<any>();
  

  constructor() { }

  sendData(data: any): void {
    this.dataSubject.next(data);
  }

  getData(): Observable<any> {
    return this.data$;
  }
}
