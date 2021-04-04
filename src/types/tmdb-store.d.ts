namespace TMDBStore {
  interface RootState {
    configuration: ConfigurationSlice
  }

  interface ConfigurationSlice {
    requestToken: string
    accessToken: string
    accountID: string
  }
}