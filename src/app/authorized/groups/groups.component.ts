import { Component, OnInit } from '@angular/core';
import { GroupsService } from './groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  groupsExist = true;
  response;
  groups;
  errors = [];

  constructor(private groupsService: GroupsService) {}

  ngOnInit() {
    this.groupsService.getUsersGroups().subscribe(
      (response) => {
        if (response.status === 200) {
          this.response = response.body;
          this.groups = this.response.results;
        }
      },
      (error) => {
        this.groupsExist = false;
        this.errors.push(error.error.message);
      },
    );
  }
}
