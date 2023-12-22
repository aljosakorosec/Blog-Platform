import { Component } from '@angular/core';
import { PostService } from '../post.service';
import * as data from "src/assets/data.json"
import { DialogRef } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  constructor(private post:PostService, private dialogRef:DialogRef, private snackbar:MatSnackBar){ }
  //input values
  inputHeading!:any
  inputText!:any;
  author!:string;

  userId:any="u201e3y"
  //date
  date:any=new Date()
  day=this.date.getDate()
  month=this.date.getMonth() +1
  year=this.date.getFullYear()
  //posts from JSON file
  OriginalPosts=(data as any).default

  modifiedPosts:any[]=this.OriginalPosts
  //show hint
  show:boolean=false

  spinner:boolean=false
  cont:boolean=true
  //add post function 
  addPost(heading:any, text:any,author:string){
      if(heading!=null && text!=null && author!=null){
      let textArray=text.split(" ")
      let textLength=textArray.length 
      if(textLength>10 && textLength<30){
        this.modifiedPosts.unshift({
          "authorId": this.userId,
          "author":author,
          "heading":heading,
          "text":text,
          "date":this.year+"-"+this.month+"-"+this.day,
          "userId":this.userId
        })
        this.cont=false
        this.spinner=true
        setTimeout(() => {
           //send modified posts
        this.post.sendData(this.modifiedPosts)
        this.inputHeading="", this.inputText="", this.author=""
        
        //close dialog
        this.dialogRef.close()
        this.cont=true
        }, 2000);
      }else{
        this.show=true
      }
      }
    }

    openSnackBar(message:any){
      if(this.inputHeading==null || this.inputText==null || this.author==null){
        this.snackbar.open(message,"",{duration : 1500} )
      }
    }
  }
