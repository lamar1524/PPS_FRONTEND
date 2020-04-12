import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';

import { IPost } from '../../core/interfaces/posts.interfaces';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: IPost;
  @Input() withGroup: boolean;
  private isOwner: boolean;
  private classObj: { active: boolean };

  constructor(private profileService: ProfileService, @Inject(DOCUMENT) private document: Document) {
    this.classObj = {
      active: false,
    };
  }

  ngOnInit(): void {
    this.profileService.getUsersCredentials().subscribe(
      (res) => {
        this.isOwner = res.email === this.post.owner.email;
      },
      () => {
        this.isOwner = false;
      },
    );
  }

  showMenu($event: Event) {
    $event.stopPropagation();
    this.classObj = { active: true };
  }

  @HostListener('window:click') deactivate() {
    this.classObj = { active: false };
  }
}