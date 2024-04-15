export type ErrorCallback = (errorMessage: string) => void

export type FetchAllReposByUsernameParams = {
   username: string,
   perPage?: number,
}

export type GithubUser = {
   login: string,
   id: number,
   avatar_url: string,
   name: string | null,
   company: string | null,
   blog: string | null,
   location: string | null,
   email: string,
   followers: number,
   following: number,
   created_at: string,
   bio: string,
   html_url: string,
   public_gists: number | null,
   public_repos: number | null,
   updated_at: string | null
}

export type GithubRepos = {
   id: number,
   name: string,
   full_name: string,
   private: boolean,
   owner: {
      login: string,
      id: number,
      html_url: string,
   },
   html_url: string,
   description: string,
   created_at: string,
   updated_at: string,
   stargazers_count: number,
   disabled: boolean,
   topics: string[]
   language: string
}