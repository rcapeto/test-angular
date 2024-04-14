import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { GithubRepos, GithubUser } from '~/app/services/api/api.service.types';
import { RepositoriesService } from '~/app/services/repositories/repositories.service';
import { UserService } from '~/app/services/user/user.service';
import { FetchAllReposByUsernameParams } from '~/app/services/api/api.service.types'
import { AvatarComponent } from '~/app/components/avatar/avatar.component';
import { ErrorComponent } from '~/app/components/error/error.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule, AvatarComponent, MatIconModule, ErrorComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  private readonly reposPerPage = 10
  private readonly urlState = {
    param: 'username',
    search: {
      page: 'page',
      direction: 'direction',
      sort: 'sort',
    },
  }

  user: GithubUser | null = null
  error: boolean = false
  errorMessage: string = ''
  repos: GithubRepos[] = []
  loading: boolean = false
  usernameInParams = ''
  loadingRepos = false

  formGroup = new FormGroup({
    direction: new FormControl<FetchAllReposByUsernameParams['direction']>(undefined),
    page: new FormControl(1),
    sort: new FormControl<FetchAllReposByUsernameParams['sort']>(undefined),
  })

  constructor(
    private userService: UserService, 
    private activeRoute: ActivatedRoute,
    private repoService: RepositoriesService,
    private router: Router,
  ) {
    activeRoute.queryParams.subscribe(queryParams => {
      Object.keys(this.urlState.search).forEach(searchKey => {
        if(searchKey in queryParams) {
          this.formGroup.patchValue({ 
            [searchKey]: queryParams[searchKey],
          })
        }
      }) 
    })

    activeRoute.params.subscribe(params => {
      if(this.urlState.param in params) {
          this.usernameInParams = params[this.urlState.param]

          if(!this.user) {
            this.userService.getByUsername(params[this.urlState.param])
          }

          this.fetchRepos()

      } else {
        this.error = true 
        this.errorMessage = 'Not found username in URL'
      }
    })
  }

  fetchRepos() {
    // TO-DO: REMOVER ISSO
    if(this.repos) {
      return
    }

    this.repoService.getRepos({ 
      username: this.usernameInParams,
      direction: this.formGroup.value.direction ?? undefined,
      page: this.formGroup.value.page ?? 1,
      perPage: this.reposPerPage,
      sort: this.formGroup.value.sort ?? undefined,
    })
  }

  ngOnInit() {
    this.userService.getState().subscribe(state => {
      console.log("@@ user", state)

      this.error = state.error
      this.errorMessage = state.errorMessage
      this.loading = this.loading
      this.user = state.data
    })

    this.repoService.getState().subscribe(state => {
      console.log("@@ repos", state)

      this.loadingRepos = state.loading
      this.repos = state.data
    })
  }

  getUserInfo() {
    if(!this.user) {
      return []
    }

    return [
      { label: 'Repos', value: this.user.public_repos ?? 0 },
      { label: 'Gists', value: this.user.public_gists ?? 0 },
      { label: 'Seguindo', value: this.user.following },
      { label: 'Seguidores', value: this.user.followers },
    ]
  }
}
