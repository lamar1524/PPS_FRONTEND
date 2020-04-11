import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { AllPostsService } from './all-posts/all_posts.service';
import { HomeGuard } from '../core/home.guard';
import { AuthorizedComponent } from './authorized.component';
import { routing } from './authorized-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../core/token.interceptor';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { GroupsService } from './groups/groups.service';
import { SearchService } from './search/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from './profile/profile.service';
import { SingleGroupComponent } from './groups/single-group/single-group.component';
import { ForeignGroupComponent } from './groups/foreign-group/foreign-group.component';
import { ForeignGroupService } from './groups/foreign-group/foreign-group.service';
import { AddGroupComponent } from './groups/add-group/add-group.component';



@NgModule({
  declarations: [
    AllPostsComponent,
    AuthorizedComponent,
    NavigationComponent,
    GroupsComponent,
    SearchComponent,
    ProfileComponent,
    SingleGroupComponent,
    ForeignGroupComponent,
    AddGroupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AuthorizedComponent],
  providers: [
    HomeGuard, AllPostsService, GroupsService, SearchService, ProfileService, ForeignGroupService, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AuthorizedModule { }
