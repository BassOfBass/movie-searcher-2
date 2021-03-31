namespace TMDBStore {
  export interface RootState {
    tmdbConfig: Configuration
    tmdbList: List,
    tmdbAccount: {}
  }
  
  export interface StateSelector {
    (state: RootState): Section
  }

  interface Section {
    status: "idle" | "loading" | "succeeded" | "failed"
    error: null | string
  }

  export interface List extends Section {
    list: TMDBEndpoints.List
  }
}