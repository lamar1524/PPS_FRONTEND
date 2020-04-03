import { Component, OnInit, HostListener } from '@angular/core';
import { AllPostsService } from './all_posts.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  response;
  posts;
  nextUrl;
  postsExist = true;
  errors = [];
  constructor(private allPostsService: AllPostsService) { }
  ngOnInit() {
    this.allPostsService.getUsersPosts().subscribe(response => {
      if (response.status === 200) {
        this.response = response.body;
        this.posts = this.response.results;
        this.nextUrl = this.response.next;
      }

    }, error => {
      if (error.status === 406) {
        this.postsExist = false;
        this.errors.push(error.error.failed);
      }
    });
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.nextUrl !== 'null') {
        this.allPostsService.getFurtherPosts(this.nextUrl).subscribe(response => {
          let body;
          if (response.status === 200) {
            body = response.body;
            this.posts = this.posts.concat(body.results);
            this.nextUrl = body.next;
          }
        }, error => {
          if (error.status === 406) {
            this.errors.push(error.error.failed);
          }
        });
      }
    }
  }
}
