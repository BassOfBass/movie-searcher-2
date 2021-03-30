interface TMDBEndpointList {
  poster_path?: string | null
  id?: number
  backdrop_path?: string | null
  total_results?: number
  public?: boolean
  revenue?: string
  page?: number
  iso_639_1?: string
  iso_3166_1?: string
  total_pages?: number
  description?: string
  average_rating?: number
  runtime?: number
  name?: string
  comments: { [id: string]: string | null } 
  created_by?: {
    gravatar_hash?: string
    name?: string
    username?: string
  }
  results?: object[]
}