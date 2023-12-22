import { Component,OnInit,OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as data from "src/assets/data.json"
import { AddPostComponent } from './add-post/add-post.component';
import { MatDialog} from '@angular/material/dialog';
import { PostService } from './post.service';
import { UpdatePostComponent } from './update-post/update-post.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'BlogApp';
  //hold all post and post currently displaying
  constructor(private dialog:MatDialog, private Posts:PostService ){ }
  
  subscription!:Subscription
  //all posts from JSON data
  posts=(data as any).default
  //userId
  userId:any="u201e3y"
  //displayed posts
  currentPosts:any[]=[]

  
  disabled:boolean=true
  currentPage:number=0
  itemsPerPage:number=6
  cant:boolean=true

  //display current posts
  private updateCurrentItems() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPosts = this.posts.slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    //get data when the post is added
    this.subscription=this.Posts.posts$.subscribe(data=>{
      this.posts=data
      this.changePosts
      this.updateCurrentItems()
    })
    this.updateCurrentItems()
  }
  //cancel subscription
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  //when (page) is clicked this function executes-->paginator logic
  changePosts(event: PageEvent){
    this.currentPage=event.pageIndex
    this.itemsPerPage = event.pageSize;
    this.updateCurrentItems()
  }

  //add post dialog 
  openFormDialog(){
    this.dialog.open(AddPostComponent,{
      width:"800px",
      height:"500px"
    })
  }
  //edit post dialog
  openEditDialog(user:any){
    this.dialog.open(UpdatePostComponent,{
      width:"800px",
      height:"500px"
    })
    //send data about updated post
    this.Posts.sendData2(user)
  }

  //delete post
  deletePost(user:any){
    this.posts.splice(this.posts.indexOf(user),1)
    this.updateCurrentItems()
  }
}
