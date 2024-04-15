import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';

import { ApiService } from '~/app/services/api/api.service';
import { UserApiState } from './user.service.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly emptyState: UserApiState = {
    data: null,
    error: false,
    errorMessage: '',
    loading: false,
  }

  private state = new BehaviorSubject<UserApiState>(this.emptyState)

  constructor(private apiService: ApiService) {}

  onReset() {
    this.state.next(this.emptyState)
  }

  getByUsername(username: string){
    this.state.next({...this.emptyState, loading: true })

    this.apiService.fetchByUsername(username)
      .pipe(
        catchError(this.apiService.errorBoundary((errorMessage => {
          this.state.next({
            data: null,
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
