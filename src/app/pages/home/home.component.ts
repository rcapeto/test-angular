import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'

import { InputComponent } from '~/app/components/input/input.component';
import { ApiService } from '~/app/services/api.service';
import { GithubUser } from '~/app/services/types'
import { catchError, finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '~/app/components/error/error.component';
import { GitUserComponent } from '~/app/components/gituser/gituser.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    InputComponent, 
    MatIconModule, 
    CommonModule, 
    ErrorComponent,
    GitUserComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  searchUser: GithubUser | null = null
  loading = false
  error = false
  inputText = ''
  errorMessage = ''

  constructor(private gitService: ApiService, private activeRoute: ActivatedRoute) {
    const searchParam = 'search'

    activeRoute.queryParams.subscribe(params => {
      if (searchParam in params) {
        const searchParamValue = params[searchParam]

        this.inputText = searchParamValue
        this.onFetchUser(searchParamValue)
      }
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
    this.loading = true
    this.error = false
    this.searchUser = null
    this.errorMessage = ''

    this.gitService.fetchByUsername(searchText)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Falha na requisição'

          if(error instanceof HttpErrorResponse) {
            this.errorMessage = error?.error?.message ?? 'Falha na requisição'
          }

          this.error = true 

          throw error
        }),
        finalize(() => {
          this.loading = false
        })
      )
      .subscribe(data => {
        this.loading = true
        this.searchUser = data
      })
  }
}