import { GithubRepos } from '~/app/services/api/api.service.types'

export type RepositoriesApiState = {
  data: GithubRepos[],
  loading: boolean,
  error: boolean,
  errorMessage: string,
}