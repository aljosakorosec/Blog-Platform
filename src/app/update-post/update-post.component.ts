import { Component,OnInit,OnDestroy } from '@angular/core';
import * as data from "src/assets/data.json"
import { PostService } from '../post.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit, OnDestroy{

  constructor(private Post:PostService, private dialogRef:DialogRef, private snackbar:MatSnackBar){ }
  subscription!:Subscription

  //get current user when the edit icon is clicked
  ngOnInit(): void {
    this.subscription=this.Post.postss$.subscribe(
      data => {
        this.currentPost = data;
      },
      error => console.error('Error:', error)
    );
  }
  //cancel subscription 
  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }
  
  //input values
  inputHeading!:any
  inputText!:any
  //show hint
  show:boolean=false

  //date of change
  date:any=new Date()
  day=this.date.getDate()
  month=this.date.getMonth() +1
  year=this.date.getFullYear()

  //new user
  users=(data as any).default
  //post we are editing
  currentPost!:any
  //posts array with updated post
  updatedPosts:any[]=this.users
  userId:any="u201e3y"

  spinner:boolean=false
  
  //update post
  updatePost(heading:any, text:any){
    //get clicked post  data
      if(heading!=null && text!=null){
        let newPost={
          "authorId": this.currentPost.authorId,
          "author":this.currentPost.author,
          "heading":heading,
          "text":text,
          "date":this.year+"-"+this.month+"-"+this.day,
          "userId":this.userId,
          "disabled":"false"
        }
        //check number of words
        let textArray=text.split(" ")
        let textLength=textArray.length 
        if(textLength>10 && textLength<30){
          this.spinner=true
          setTimeout(() => {
              //change post
          this.updatedPosts[this.updatedPosts.indexOf(this.currentPost)]=newPost
          //send changed post array
          this.Post.sendData(this.updatedPosts)
          this.inputHeading="", this.inputText=""
          this.spinner=false
          //close dialog
          this.dialogRef.close()
          }, 2000);
        }else{
          //show hint
          this.show=true
        }
      }
  }

  openSnackBar(message:any){
    if(this.inputHeading==null || this.inputText==null){
      this.snackbar.open(message,"",{duration : 1500} )
    }
  }
}
