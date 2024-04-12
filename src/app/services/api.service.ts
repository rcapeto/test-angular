import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { 
  FetchAllReposByUsernameParams,
  GithubRepos,
  GithubUser,
  ErrorCallback
} from './types'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseApi = 'https://api.github.com'

  constructor(private http: HttpClient) { }

  fetchByUsername(username: string) {
    const uri = this.uriParser(`users/${username}`)

    return this.http.get<GithubUser>(uri.toString())
  }

  fetchReposByUsername({ username, direction, page = 1, perPage, sort }: FetchAllReposByUsernameParams) {
    const uri = this.uriParser(`users/${username}/repos`)

    uri.searchParams.set('per_page', String(perPage))
    uri.searchParams.set('page', String(page))

    if (sort) {
      uri.searchParams.set('sort', sort)
    }

    if (direction) {
      uri.searchParams.set('direction', direction)
    }

    return this.http.get<GithubRepos[]>(uri.toString())

  }

  errorBoundary(callback: ErrorCallback) {
    return(error: HttpErrorResponse) => {
      let errorMessage = 'Falha na requisição'

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
