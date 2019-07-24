import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupChatWSService {
  private msgSource=new BehaviorSubject<any>(undefined);


  constructor() { }

  emitGroupChat(groupChatInfo:any){
    this.msgSource.next(groupChatInfo);
  }

  getMsgSubjectObservable():Observable<any>{
    return this.msgSource.asObservable();
  }
}
