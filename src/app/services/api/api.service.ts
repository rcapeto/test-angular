import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { 
  FetchAllReposByUsernameParams,
  GithubRepos,
  GithubUser,
  ErrorCallback
} from './api.service.types'
import { environment } from '~/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseApi = environment.apiUrl
  constructor(private http: HttpClient) { }

  fetchByUsername(username: string) {
    const uri = this.uriParser(`users/${username}`)

    return this.http.get<GithubUser>(uri.toString())
  }

  fetchReposByUsername({ username, perPage = 100 }: FetchAllReposByUsernameParams) {
    const uri = this.uriParser(`users/${username}/repos`)

    uri.searchParams.set('per_page', String(perPage))

    return this.http.get<GithubRepos[]>(uri.toString())
  }

  errorBoundary(callback: ErrorCallback) {
    return(error: HttpErrorResponse) => {
      let errorMessage = 'Falha na requisição'
      console.error('API Error', error)

      if(error instanceof HttpErrorResponse) {
        errorMessage = error?.error?.message ?? 'Falha na requisição'
      }

      callback?.(errorMessage)

      throw error
    }
  }


  private uriParser(pathname: string) {
    const uri = new URL(`${this.baseApi}/${pathname}`)
    return uri
  }
}
