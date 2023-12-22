import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

 
  constructor() { }

  //for adding post
  private posts=new Subject<any>
  posts$=this.posts.asObservable()

  sendData(data:any[]){
    this.posts.next(data)
  }

  //for updating post
  private postss=new BehaviorSubject<any>("")
  postss$=this.postss.asObservable()

  sendData2(data:any[]){
    this.postss.next(data)
  }
}
