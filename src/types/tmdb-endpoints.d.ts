namespace TMDBEndpoints {
  interface Request {
    success: boolean
  }

  interface Entry {
    id: number
  }

  interface Genre extends Entry {
    name: string
  }

  interface ProductionCompany extends Entry {
    name: string
    logo_path: string | null
    origin_country: string
  }

  /**
   * TODO: write an errorlist interface
   */
  export interface Error extends Request {
    status_code: number
    status_message: string
  }

  interface PagedEntry {
    page: number,
    total_pages: number,
    total_results: number
  }

  namespace List {
    export interface GetList extends PagedEntry{
      poster_path?: string | null
      id?: number
      backdrop_path?: string | null
      public?: boolean
      revenue?: string
      iso_639_1?: string
      iso_3166_1?: string
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
      results?: ListResult[]
    }

    export interface ListResult {
      poster_path: string | null
      adult: boolean
      overview: string
      release_date: string
      original_title: string
      genre_ids: number[]
      id: number
      media_type: "movie"
      original_language: string
      title: string
      backdrop_path: string | null
      popularity: number
      vote_count: integer
      video: boolean
      vote_average: number
    }

  }
  

  

  export interface Account {
    avatar?: {
      gravatar: {
        hash: string
      }
    }
  
    id: number
    iso_639_1: string
    iso_3166_1: string
    name: string
    include_adult: boolean  
    username: string
  
  }

  export interface MovieCertifications {
    US: TMDBEndpointCertificationsEntry[]
    CA: TMDBEndpointCertificationsEntry[]
    DE: TMDBEndpointCertificationsEntry[]
    GB: TMDBEndpointCertificationsEntry[]
    AU: TMDBEndpointCertificationsEntry[]
    BR: TMDBEndpointCertificationsEntry[]
    FR: TMDBEndpointCertificationsEntry[]
    NZ: TMDBEndpointCertificationsEntry[]
    IN: TMDBEndpointCertificationsEntry[]
  }
  
  export interface TVCertifications {
    US: TMDBEndpointCertificationsEntry[]
    CA: TMDBEndpointCertificationsEntry[]
    AU: TMDBEndpointCertificationsEntry[]
    FR: TMDBEndpointCertificationsEntry[]
    RU: TMDBEndpointCertificationsEntry[]
    DE: TMDBEndpointCertificationsEntry[]
    TH: TMDBEndpointCertificationsEntry[]
    KR: TMDBEndpointCertificationsEntry[]
    GB: TMDBEndpointCertificationsEntry[]
    BR: TMDBEndpointCertificationsEntry[]
  }
  
  export interface CertificationsEntry {
    certification: string
    meaning: string
  
    order: number
  }
  
  export interface GuestSession extends Request {
    guest_session_id: string
    expires_at: string
  }

  export interface RequestToken extends Request {
    expires_at: string
    request_token: string
  }

  namespace ChangeList {

    interface List extends PagedEntry {
      results: {
        id: number,
        adult: boolean | null
      }[]
    }

    export interface Movie extends List {}
    export interface TV extends List {}
    export interface Person extends List {}
  }

  namespace Collection {
    export interface Details {
      id: number
      name: string
      overview: string
      poster_path: null
      backdrop_path: string
      parts: Part[]
    }

    export interface Part {
      adult: boolean
      backdrop_path: null
      genre_ids: number[]
      id: number
      original_language: string
      original_title: string
      overview: string
      release_date: string
      poster_path: string
      popularity: number
      title: string
      video: boolean
      vote_average: number
      vote_count: number
    }

    export interface Images {
      id: number
      backdrops: Backdrop[]
      posters: Poster[]
    }
    
    interface Image {
      aspect_ratio: number
      file_path: string
      height: integer
      width: integer
      vote_average: number
      vote_count: number
    }

    export interface Backdrop extends Image {
      iso_639_1: null
    }

    export interface Poster extends Image {
      iso_639_1: string
    }

    export interface Translations {
      id: number
      translations: {
        iso_3166_1: string
        iso_639_1: string
        name: string
        english_name: string
        data: {
          title: string
          overview: string
          homepage: string
        }
      }[]
    }
  }

  namespace Company {
    export interface Details extends Entry {
      description: string
      headquarters: string
      homepage: string
      logo_path: string
      name: string
      origin_country: string
      parent_company: null | object
    }
  
    export interface AltNames extends Entry {
      results: {
        name: string
        type: string
      }[]
    }

    export interface Images extends Entry {
      logos: Logo[]
    }

    export interface Logo extends Entry {
      aspect_ratio: number
      file_path: string
      height: number
      file_type: ".svg" | ".png"
      vote_average: number
      vote_count: number
      width: number
    }
  }

  namespace Configuration {

    export interface API {
      images: {
        base_url: string
        secure_base_url: string
        backdrop_sizes: string[]
        logo_sizes: string[]
        poster_sizes: string[]
        profile_sizes: string[]
        still_sizes: string[]
      }
      change_keys: string[]
    }
    
    export interface Country {
      iso_3166_1: string
      english_name: string
    }

    export interface Job {
      department: string
      jobs: string[]
    }

    export interface Language {
      iso_639_1: string
      english_name: string
      name: string
    }

    export interface Timezone {
      iso_3166_1: string
      zones: string[]
    }
  }

  export interface Genres {
    genres: Genre[];
  }

  namespace Movies {
    export interface Details extends Entry {
      adult: boolean
      backdrop_path: string | null
      belongs_to_collection: object | null
      budget: number
      genres: Genre[]
      homepage: string | null
      /**
       * - minLength: 9
       * - maxLength: 9
       * - pattern: `^tt[0-9]{7}`
       */
      imdb_id: string |null
      original_language: string
      original_title: string
      overview: string | null
      popularity: number
      poster_path: string | null
      production_companies: ProductionCompany[]
      production_countries: {
        iso_3166_1: string
        name: string
      }[]
      /**
       * format: `date`
       */
      release_date: string
      revenue: number
      runtime: number | null
      spoken_languages: {
        iso_639_1: string
        name: string
      }[]
      status: "Rumored" | "Planned" | "In Production" | "Post | Production" | "Released" | "Canceled"
      tagline: string | null
      title: string
      video: boolean
      vote_average: number
      vote_count: number
    }
  }
}






