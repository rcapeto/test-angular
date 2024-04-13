import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { ApiService } from '~/app/services/api/api.service';
import type { FetchAllReposByUsernameParams } from '~/app/services/api/api.service.types';
import { RepositoriesApiState } from './repositories.service.types'

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {
  private readonly emptyState: RepositoriesApiState = {
    data: [],
    error: false,
    errorMessage: '',
    loading: false,
  }

  private state = new BehaviorSubject<RepositoriesApiState>(this.emptyState)

  constructor(private apiService: ApiService) {}

  getRepos(params: FetchAllReposByUsernameParams) {
    this.state.next({...this.emptyState, loading: true })

    this.apiService.fetchReposByUsername(params)
      .pipe(
        catchError(this.apiService.errorBoundary((errorMessage => {
          this.state.next({
            data: [],
            error: true,
            errorMessage,
            loading: false,
          })
        }))),
      )
      .subscribe(data => {
        this.state.next({
          data,
          error: false,
          errorMessage: '',
          loading: false,
        })
      })
  }

  getState() {
    return this.state.asObservable()
  }
}
