export type ErrorCallback = (errorMessage: string) => void

export type FetchAllReposByUsernameParams = {
   perPage?: number,
   username: string,
   page?: number,
   sort?: 'stars' | 'full_name' | 'owner',
   direction?: 'asc' | 'desc'
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

}

export type GithubRepos = {
   id: number,
   name: string | null,
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
}