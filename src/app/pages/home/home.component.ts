import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router'
import { CommonModule } from '@angular/common';

import { InputComponent } from '~/app/components/input/input.component';
import { ApiService } from '~/app/services/api/api.service';
import { GithubUser } from '~/app/services/api/api.service.types'
import { ErrorComponent } from '~/app/components/error/error.component';
import { CardComponent } from '~/app/components/card/card.component';
import { CardLoadingComponent } from '~/app/components/card-loading/card-loading.component';
import { UserService } from '~/app/services/user/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InputComponent,
    MatIconModule,
    CommonModule,
    ErrorComponent,
    CardComponent,
    CardLoadingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly searchParamsTerm = 'search'

  searchUser: GithubUser | null = null
  loading = false
  error = false
  inputText = ''
  errorMessage = ''

  constructor(
    private userService: UserService, 
    private activeRoute: ActivatedRoute, 
    private router: Router
  ) {

    activeRoute.queryParams.subscribe(params => {
      if (this.searchParamsTerm in params) {
        const searchParamValue = params[this.searchParamsTerm]

        this.inputText = searchParamValue
        this.onFetchUser(searchParamValue)
      }
    })
  }
  ngOnInit(): void {
    this.userService.getState().subscribe(state => {
      this.searchUser = state.data
      this.loading = state.loading
      this.error = state.error
      this.errorMessage = state.errorMessage
    })
  }

  onChangeInputValue(text: string) {
    this.inputText = text
  }

  onPressSearchUsername() {
    if (this.inputText) {
      this.onFetchUser(this.inputText)
    }
  }

  onFetchUser(searchText: string) {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        [this.searchParamsTerm]: searchText,
      }
    })
    this.userService.getByUsername(searchText)
  }
}
