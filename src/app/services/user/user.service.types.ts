import { GithubUser } from '~/app/services/api/api.service.types'

export type UserApiState = {
  data: GithubUser | null,
  loading: boolean,
  error: boolean,
  errorMessage: string,
}