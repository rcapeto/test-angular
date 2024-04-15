import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { GithubRepos, GithubUser } from '~/app/services/api/api.service.types';
import { RepositoriesService } from '~/app/services/repositories/repositories.service';
import { UserService } from '~/app/services/user/user.service';
import { AvatarComponent } from '~/app/components/avatar/avatar.component';
import { ErrorComponent } from '~/app/components/error/error.component';
import { RelativeDatePipe } from '~/app/pipes/relative-date.pipe';
import { RepositoryComponent } from '~/app/components/repository/repository.component';
import { SelectComponent } from '~/app/components/select/select.component';
import { InputComponent } from '~/app/components/input/input.component';
import { SelectOption } from '~/app/components/select/select.component.types';
import { OrderBy, OrderType, UpdateURLParams } from './user.component.types'
import { ButtonComponent } from '~/app/components/button/button.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    AvatarComponent, 
    MatIconModule, 
    ErrorComponent,
    RelativeDatePipe,
    RepositoryComponent,
    SelectComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {
  private readonly reposPerPage = 100
  private readonly urlState = {
    param: 'username',
    searchParams: {
      orderBy: 'order_by',
      orderType: 'order_type',
      search: 'search',
    },
  }

  readonly orderTypeSelectOptions: SelectOption<OrderType>[] = [
    { label: 'Estrelas', value: 'stars' },
    { label: 'Nome', value: 'name' },
  ]
  readonly orderBySelectOptions: SelectOption<OrderBy>[] = [
    { label: 'Crescente', value: 'asc' },
    { label: 'Decrescente', value: 'desc' },
  ]

  user: GithubUser | null = null
  filteredRepos: GithubRepos[] = []
  repos: GithubRepos[] = []

  error: boolean = false
  errorMessage: string = ''
  errorRepos = false 
  
  loadingRepos = false
  loading: boolean = false

  usernameInParams = ''
  formGroup = new FormGroup({
    orderBy: new FormControl<'asc' | 'desc'>('asc'),
    orderType: new FormControl<'stars' | 'name'>('name'),
    search: new FormControl<string>(''),
  })

  constructor(
    private userService: UserService, 
    private activeRoute: ActivatedRoute,
    private repoService: RepositoriesService,
    private router: Router,
  ) {
    activeRoute.queryParams.subscribe(queryParams => {
      Object.keys(this.urlState.searchParams).forEach(searchKey => {
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
  ngOnDestroy() {
    this.usernameInParams = ''
    this.formGroup.reset()
    this.userService.onReset()
  }

  ngOnInit() {
    this.userService.getState().subscribe(state => {
      console.log("@@ state user", state)
      this.error = state.error
      this.errorMessage = state.errorMessage
      this.loading = this.loading
      this.user = state.data
    })

    this.repoService.getState().subscribe(state => {
      console.log("@@ state repos", state)
      this.loadingRepos = state.loading
      this.repos = state.data
      this.filteredRepos = this.onFilterRepos()
      this.errorRepos = state.error
    })
  }

  fetchRepos() {
    this.repoService.getRepos({ 
      username: this.usernameInParams,
      perPage: this.reposPerPage,
    })
  }

  onChangeInputValue(search: string) {
    this.formGroup.patchValue({ search })
  }

  onSelectFilterBy(option: SelectOption<OrderBy>) {
    this.formGroup.patchValue({
      orderBy: option.value,
    })
  }

  onSelectFilterType(option: SelectOption<OrderType>) {
    this.formGroup.patchValue({
      orderType: option.value,
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

  onUpdateURL(params: UpdateURLParams) {
    const queryParams: Record<string, string> = {}

    Object.entries(params).forEach(([key, value]) => {
      if(value) {
        queryParams[key] = value
      }
    })
    
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams,
    })
  }

  onSearch() {
    this.filteredRepos = this.onFilterRepos()

    this.onUpdateURL({
      orderBy: this.formGroup.value.orderBy as string,
      orderType: this.formGroup.value.orderType as string,
      search: this.formGroup.value.search ?? '',
    })
  }

  onFilterRepos() {
    const { orderBy, orderType, search } = this.formGroup.value

    if(!orderBy) {
      return this.repos.filter(
        (repo) => repo.name.toLowerCase().includes((search ?? '').toLowerCase())
      )
    }

    return this.repos.sort((repoA, repoB) => {
      const isDesc = orderBy === 'desc'
      const isStars = orderType === 'stars'

      if(isStars && isDesc) {
          return repoB.stargazers_count - repoA.stargazers_count
      } else if(isStars) {
        return repoA.stargazers_count - repoB.stargazers_count
      }

      return isDesc ? 
        repoB.name.localeCompare(repoA.name) : 
        repoA.name.localeCompare(repoB.name)
    })
    .filter(
      repo => repo.name.toLowerCase().includes((search ?? '').toLowerCase())
    )
  }
}
